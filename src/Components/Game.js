import React from 'react';
import DisplayCard from "./DisplayCard"
import Hand from "./Hand"
import Board from './Board';
import Discard from './Discard'
class Game extends React.Component{

    constructor(props){
        super(props)
        this.state={
            
            playerNumber: this.props.playerNumber,
            hoveredCard: {
                name: null,
                description: "",
                attributes: "",
                color: ""
            },
            loadingPhase: 2,
            gamePhase:0,
            handCardInfo:[
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
            ],
            myCardInfo:[
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
            ],
            oppCardInfo:[
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""},
            ],
            draggingCard: null,
            gameSizeStyle : {
                width: "1125px", 
                height: "825px",
                border: "1px solid #aaaaaa"
            },
            timePassed: 0,

            buffs:[],
            buffsApplied:0,
            socket:null,
            socketMessage:"",
            isLastCard: false,
            replace: false,
            ready:false,
            discardedCards:[{id:-1,name:"",description:"",rarity:"",color:""},
                {id:-1,name:"",description:"",rarity:"",color:""}]
        }
         /*
            Need a timer for:
            1- show random card to move on to next screen -10 seconds
            2- to play first 4 cards - 45 seconds
            3- to play second 3 cards - 45 seconds
            4- to replace last card //can just be one long timer - 20 seconds
            5- to delay showing the final results? - 5 seconds
         */
    }

    componentDidMount(){
        console.log("Game Mounted");
        const socket = new WebSocket("ws://localhost:8888/gameAction");
        socket.onmessage = (e) => {
            const socketMessage = JSON.parse(e.data);
            this.socketResponse(socketMessage);
         };
         const action = {};
         action.action = "MATCHMAKE";
         action.token = localStorage.getItem('jwt');
         socket.onopen = (e) => {
            socket.send(JSON.stringify(action));
         }
         this.setState({socket})
    } 

    socketResponse = (message) =>{
        console.log(message);
        let oppCards = null;
        let newOppCards = null;
        console.log(this.state.gamePhase)
        switch(this.state.gamePhase){
            case 0:
                //get initial hand
                this.setState({handCardInfo:message.cards,gamePhase:message.nextPhase, ready:false})
                break;
            case 1:
                //get first 4 opp cards
                oppCards = message.cards;
                newOppCards = this.state.oppCardInfo.map((card,index)=>{
                    if(index<oppCards.length){
                        return oppCards[index];
                    }
                    return card;
                });
                this.setState({oppCardInfo:newOppCards, gamePhase:message.nextPhase, ready:false});
                break;
            case 2:
                //gets new hand
                this.setState({handCardInfo:message.cards, gamePhase:message.nextPhase, ready:false});
                break;
            case 3:
                //get 2 of opp last cards
                oppCards = message.cards;
                newOppCards = this.state.oppCardInfo.map((card,index)=>{
                    if(index>3 && index <6){
                        return oppCards[index-4];
                    }
                    return card;
                });
                this.setState({oppCardInfo:newOppCards, gamePhase:message.nextPhase, ready:false, isLastCard:true});
                break;
            case 4:
                //last card
                let lastCard = message.lastCard;
                newOppCards = this.state.oppCardInfo.map((card,index) =>{
                    if(index == 6){
                        return lastCard;
                    }
                    return card;
                });
                this.setState({oppCardInfo:newOppCards, gamePhase:message.nextPhase, ready:false});
                break;
            case 4:
                
                break;
            
        }
    }

    startTimer = (onExpiryCall) => {
        this.state.timer = setInterval(onExpiryCall, 1000);
    }

    stopTimer = () => {
        clearInterval(this.state.timer);
        this.state.timePassed = 0;
    }

    showColorPicking = () => {
        if(this.state.timePassed == 10){
            this.stopTimer();
            this.startTimer(this.submitFirstFourCards);
        }
    }
    submitFirstFourCards = () => {
        if(this.state.timePassed == 45){
            //socket submit cards, get
            this.stopTimer();
            this.startTimer(this.revCards(0,3,this.submitSecondThreeCards));
        }
    }
    revCards = (start,end, callback) => {
        let playerOneBoard = this.playerNumber == 1?this.state.myCardInfo:this.state.oppCardInfo;
        let playerTwoBoard = this.playerNumber == 2?this.state.oppCardInfo:this.state.myCardInfo;
        
        for(let index  = start; index <= end; index++){
            //Get buffs from API
            this.reveal(playerOneBoard[index]);
            this.processBuffs(this.reveal(playerTwoBoard[index]));
        }
        callback();
    }
    processBuffs = () => {
        for(let index = 0; index < this.state.buffs.length; index++){
            this.animateBuff(this.state.buffs[index]);
        }
        setTimeout({},500)
    }
    animateBuff = (buff) => {

    }
    submitSecondThreeCards = () => {
        if(this.state.timePassed == 45){
            this.stopTimer();
            this.startTimer(this.revCards(4,5,this.submitReplaceLastCard));
        }
    }
    submitReplaceLastCard = () => {
        if(this.state.timePassed == 20){
            this.stopTimer();
            this.startTimer(this.revCards(6,6,this.showResults));
        }
    }
    showResults = () => {
        if(this.state.timePassed == 5){
            alert("")
        }
    }


    onMouseEnter = (card) => {
        //console.log(card);
        if(card.id === -1) return;
        //if(card.description == null) return;
        this.setState({hoveredCard: card})
        console.log("mouseEnter: " + card.index)
    };
    
      onDragStart = (card) => {
        console.log("dragStart")
        this.setState({draggingCard:card})
        //this.state.draggingCard = card.index;
        //if(card.description == null) return;
        
      };
      onDragEnd = (card) => {
        // if(card.description == null) return;
        console.log("cardDragEnd")
        this.setState({draggingCard:null});
      }
      onDrop = (event, card)=> {
        this.swapCards(this.state.draggingCard,card)

      }
      swapCards = (source, target, callback) => {
          console.log("swapCards")

            let t = this.getCardFromIndex(target)
            let s = this.getCardFromIndex(source)

            console.log(s)
            console.log(t)
            //debugger;

            this.copySrcToDest(source,target,s,t,this.copyDestToSrc);
      }
      copySrcToDest = (source,target,s,t,callback) =>{
        if(source.charAt(0) === "H"){
            const newHand = this.state.handCardInfo.map((item)=>{
                if(item == s){
                    return JSON.parse(JSON.stringify(t));
                }
                else{
                    return item;
                }
            });
            // debugger;
            this.setState({handCardInfo:newHand}, () => (callback(target,s,t)));
            // debugger;
        }
        else if(source.charAt(0) === "B"){
            const newCardInfo = this.state.myCardInfo.map((item)=>{
                if(item == s){
                    return JSON.parse(JSON.stringify(t));
                }
                else{
                    return item;
                }
            });
            this.setState({myCardInfo:newCardInfo}, () => (callback(target,s,t)));
        }
        else{
            const newCardInfo = this.state.discardedCards.map((item)=>{
                if(item == s){
                    return JSON.parse(JSON.stringify(t));
                }
                else{
                    return item;
                }
            });
            this.setState({discardedCards:newCardInfo}, () => (callback(target,s,t)));
        }
      }
      copyDestToSrc = (target,s,t) =>{
        if(target.charAt(0) === "H"){
            const newHand = this.state.handCardInfo.map((item)=>{
                if(item == t){
                    return JSON.parse(JSON.stringify(s));
                }
                else{
                    return item;
                }
            });
            // debugger;
            this.setState({handCardInfo:newHand}, () => console.log(this.state.handCardInfo));
            // debugger;
        }
        else if(target.charAt(0) === "B"){
            const newCardInfo = this.state.myCardInfo.map((item)=>{
                if(item == t){
                    return JSON.parse(JSON.stringify(s));
                }
                else{
                    return item;
                }
            });
            this.setState({myCardInfo:newCardInfo},() => console.log(this.state.myCardInfo));
        }
        else{
            const newCardInfo = this.state.discardedCards.map((item)=>{
                if(item == t){
                    return JSON.parse(JSON.stringify(s));
                }
                else{
                    return item;
                }
            });
            this.setState({discardedCards:newCardInfo},() => console.log(this.state.discardedCards));
        }
      }


      onDragOver = (event,card) => {
        event.preventDefault();
      }

      getCardFromIndex = (index) =>{
          if(index.charAt(0) === "H"){
            return this.state.handCardInfo[parseInt(index.substring(1))]
          }
          else if(index.charAt(0) === "B"){
            return this.state.myCardInfo[parseInt(index.substring(1))]
          }
          else{
              return this.state.discardedCards[parseInt(index.substring(1))]
          }
      }

      onYesClick = () =>{

      }
      onNoClick = () =>{
          
      }
      onReadyClick = () =>{
          console.log("CurrentPhase: " + this.state.gamePhase)
        let message;
        if(!this.state.ready){
            this.setState({ready:true})
        }
        let playedCards = [];
        switch(this.state.gamePhase){
            case 1:
                for(let i = 0; i < 4; i++){
                    playedCards.push(this.state.myCardInfo[i].id)
                }
                message = {action:"GAME", playedCards:playedCards};
                console.log(message);
                this.state.socket.send(JSON.stringify(message));
                break;
            case 2:
                let discardedCards = [];
                for(let i = 0; i < this.state.discardedCards.length; i++){
                    discardedCards.push(this.state.discardedCards[i].id)
                }
                message = {action:"GAME", discardedCards:discardedCards};
                console.log(message);
                this.state.socket.send(JSON.stringify(message));
                break;
            case 3:
                for(let i = 4; i < 6; i++){
                    playedCards.push(this.state.myCardInfo[i].id)
                }
                message = {action:"GAME", playedCards:playedCards};
                console.log(message);
                this.state.socket.send(JSON.stringify(message));
                break;
            case 4:
                let lastCard = this.state.myCardInfo[6].id;
                message = {action:"GAME", lastCard:lastCard, replace:this.state.replace};
                console.log(message);
                this.state.socket.send(JSON.stringify(message));
                break;                                                                        
        }
      }
      render(){
        let loadingPhase = this.state.loadingPhase
        let display = null;
        console.log("loadingPhase =" + loadingPhase)
        switch(loadingPhase){
            case 0:
                console.log("loadingPhase 0")//matchmaking
                break;
            case 1:
                console.log("loadingPhase 1")//PickColor
                break;
            case 2:
                console.log(this.state.gamePhase)
                display = 
                <div style={this.state.gameSizeStyle}>
                    <Board 
                        onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        myCardInfo = {this.state.myCardInfo} oppCardInfo = {this.state.oppCardInfo} onDrop = {this.onDrop}
                        onDragOver = {this.onDragOver} onYesClick = {this.onYesClick} onNoClick = {this.onNoClick} onReadyClick = {this.onReadyClick}
                        lastCard = {this.state.isLastCard} style = {{position:"relative", left:"25%"}} ready = {this.state.ready}
                    />
                    <DisplayCard style = {{position:"absolute", left:983, top:65}}
                        onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        hoveredCard={this.state.hoveredCard} onDrop = {this.onDrop} onDragOver = {this.onDragOver}
                    />
                    {this.state.gamePhase===2?<Discard style = {{position:"absolute",left:500, top:761}} onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        cardInfo = {this.state.discardedCards} onDrop = {this.onDrop}
                        onDragOver = {this.onDragOver}
                    />:null}
                    <Hand style={{position:"absolute",left:881, top:511}}
                        onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        handCardInfo = {this.state.handCardInfo} onDrop = {this.onDrop} onDragOver = {this.onDragOver}
                    />
                </div>

        }
        
        return(
            <>
                {display}
            </>
        )
    }

}
export default Game;