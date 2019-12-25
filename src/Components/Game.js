import React from 'react';
import DisplayCard from "./DisplayCard"
import Hand from "./Hand"
import axios from 'axios';
import Board from './Board';
class Game extends React.Component{

    constructor(props){
        super(props)
        this.state={
            hoveredCard: {
                name: "OrangeName",
                description: "BlueDesc",
                attributes: "MaleAttr",
                color: "RedColor",
                src:"https://static1.milkcapmania.co.uk/Img/pogs/Series1/75DPI/01.png"
            },
            phase: 2,
            handCardInfo:[
                {id:1,src:"https://static1.milkcapmania.co.uk/Img/Other/Spirou/75DPI/01-Spirou.png"},
                {id:2,src:"https://static1.milkcapmania.co.uk/Img/Caps/Dragonball%20Z/75DPI/17.png"},
                {id:3,src:"https://static1.milkcapmania.co.uk/Img/Caps/Dragonball%20Z/75DPI/57.png"},
                {id:4,src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/24.png"},
                {id:5,src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/25.png"},
                {id:6,src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/26.png"}
            ],
            myCardInfo:[
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"},
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"},
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"},
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"},
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"},
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"},
                {id:-1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/33.png"}
            ],
            oppCardInfo:[
                {id:1, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"},
                {id:2, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"},
                {id:31, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"},
                {id:41, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"},
                {id:51, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"},
                {id:61, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"},
                {id:71, src:"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png"}
            ],
            draggingCard: null
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
    setTimerInterval = () => {
        this.setState({
            time: Date.now() - this.state.start
        })
    }

    startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(this.setTimerInterval(), 1);
      }
      stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }


    onMouseEnter = (card) => {
        //console.log(card);
        if(card.id === -1) return;
        //if(card.description == null) return;
        this.setState({hoveredCard: {src: card.src, color: "blue", description:"gets big", name:"skullguy"}})
        console.log("mouseEnter: " + this.state.hoveredCard + " - " + card.src)
    };
    
      onDragStart = (card) => {
        console.log("dragStart")
        this.setState({draggingCard:card})
        //this.state.draggingCard = card.index;
        if(card.description == null) return;
        
      };
      onDragEnd = (card) => {
        // if(card.description == null) return;
        console.log("cardDragEnd")
        // axios.post("localhost:8888/register","").then(function(response){
        //   if(response.status === 200){
        //     console.log(response.data);
        //   }
        // })
        this.setState({draggingCard:null});
        //this.state.draggingCard = null;
      }
      onDrop = (event, card)=> {
        // console.log("onDrop")
        // console.log("dropTarget - ");
        // console.log(card);
        // console.log("draggedCard - " );
        // console.log(this.state.draggingCard);
        this.swapCards(this.state.draggingCard,card)

        // let dest = event.target;
        //console.log(event.target); 
      }
      swapCards = (source, target, callback) => {
          console.log("swapCards")
            
            console.log(source)
            console.log(target)
            let sIndex = source;
            let tIndex = target;
            let t = this.getCardFromIndex(tIndex)
            let s = this.getCardFromIndex(sIndex)

            let temp = {};
            // this.copyCard(t,temp);
            // this.copyCard(s,t);
            // this.copyCard(temp,s);
            console.log(s)
            console.log(t)
            //debugger;
            if(sIndex.charAt(0) === "H"){
                // let newCardInfo = JSON.parse(JSON.stringify(this.state.handCardInfo));
                // this.copyCard(t,newCardInfo[parseInt(sIndex.charAt(1))]);
                const newHand = this.state.handCardInfo.map((item)=>{
                    if(item == s){
                        // item.id = t.id;
                        // item.src = t.src;
                        // return item;
                        return JSON.parse(JSON.stringify(t));
                    }
                    else{
                        return item;
                    }
                });
                // debugger;
                this.setState({handCardInfo:newHand}, () => (console.log(this.state)));
                // debugger;
                // source.setState({...newCardInfo[parseInt(sIndex.charAt(1))]})
            }
            else{
                let newCardInfo = JSON.parse(JSON.stringify(this.state.myCardInfo));
                this.copyCard(t,newCardInfo[parseInt(sIndex.charAt(1))]);
                this.setState({
                    myCardInfo:newCardInfo
                });
                // source.setState({...newCardInfo[parseInt(sIndex.charAt(1))]})

            }
            if(tIndex.charAt(0) === "H"){
                let newCardInfo = JSON.parse(JSON.stringify(this.state.handCardInfo));
                this.copyCard(s,newCardInfo[parseInt(tIndex.charAt(1))]);
                this.setState({
                    handCardInfo:newCardInfo
                })
                // target.setState({...newCardInfo[parseInt(tIndex.charAt(1))]})
            }
            else{
                let newCardInfo = JSON.parse(JSON.stringify(this.state.myCardInfo));
                this.copyCard(s,newCardInfo[parseInt(tIndex.charAt(1))]);
                this.setState({
                    myCardInfo:newCardInfo
                });
                // target.setState({...newCardInfo[parseInt(tIndex.charAt(1))]})
            }

            
            // t.id = s.id;
            // t.src = s.src;


      }
      copyCard = (source, target) =>{
          target.id = source.id;
        //   target.name = source.name;
        //   target.character= source.character;
        //   target.description= source.description;
        //   target.color= source.color;
        //   target.points= source.points;
        //   target.nullified= source.nullified;
        //   target.owner= source.owner;
        //   target.bonusPoints= source.bonusPoints;
          target.src = source.src;
      }

      onDragOver = (event,card) => {
        //console.log(card)
        event.preventDefault();
        //this.setState({dropCard:card});
      }

      getCardFromIndex = (index) =>{
          if(index.charAt(0) === "H"){
            return this.state.handCardInfo[parseInt(index.charAt(1))]
          }
          return this.state.myCardInfo[parseInt(index.charAt(1))]
      }
      render(){
        let phase = this.state.phase
        let display = null;
        switch(phase){
            case 0:
                console.log("phase 0")//matchmaking
                break;
            case 1:
                console.log("phase 1")//PickColor
                break;
            case 2:
                display = 
                <>
                    <Board 
                        onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        myCardInfo = {this.state.myCardInfo} oppCardInfo = {this.state.oppCardInfo} onDrop = {this.onDrop}
                        onDragOver = {this.onDragOver}
                    />
                    <DisplayCard 
                        onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        hoveredCard={this.state.hoveredCard} onDrop = {this.onDrop} onDragOver = {this.onDragOver}
                    />
                    <Hand 
                        onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}
                        handCardInfo = {this.state.handCardInfo} onDrop = {this.onDrop} onDragOver = {this.onDragOver}
                    />
                </>

        }
        
        return(
            <>
                {display}
            </>
        )
    }

}
export default Game;