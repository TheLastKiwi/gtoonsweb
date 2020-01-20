import React from 'react'
import Axios from 'axios'
import Deck from './Deck';
import Collection from './Collection'
import DisplayCard from './DisplayCard';

class EditDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            defaultCard: {id:-1, name:"", desription:"",rarity:"",color:""},
            deck:[{id:-1, name:"default"}],
            collection:[{id:-1, name:"default"}],
            hoveredCard:{},

            draggingCard:null,
        }
    }
    componentDidMount(){

        Axios.get("http://localhost:8888/api/getDeck")
        .then(response => {
            this.setState({deck:JSON.parse(response.data.message)},
                ()=>Axios.get("http://localhost:8888/api/getCollection")
                .then(response => {
                    let coll = JSON.parse(response.data.message);

                    this.setState({collection: coll.filter((card)=>!this.isItemInDeck(card.id))});
                    
                })
                .catch(error => {
                    this.setState({collection:[]})
                })
            
            );
            
        })
        .catch(error => {
            //no deck in database
            let defaultDeck = [];
            for(let i = 0; i < 12; i++)defaultDeck.push(this.state.defaultCard)
            console.log("No Deck")
            Axios.get("http://localhost:8888/api/getCollection")
            .then(response => {
                let coll = JSON.parse(response.data.message);

                this.setState({collection: coll, deck:defaultDeck});
                
            })
            .catch(error => {
    
            })
        });

    }

    render(){
        const hovStyle = {
            position:"fixed",
            right:0
        }
        const deckStyle = {
            position:"fixed",
            right:0,
            bottom:0
        }
        return(
            <>
                <br/>
                Collection
                <DisplayCard hoveredCard = {this.state.hoveredCard} style={hovStyle}
                />
                <Collection 
                    cards= {this.state.collection} 
                    onMouseEnter = {this.onMouseEnter}
                    onDragStart = {this.onDragStart }
                    onDragEnd  = { this.onDragEnd }
                    onDrop = { this.onDrop }
                    onDragOver  = { this.onDragOver }
                    onRightclick = {this.onRightclick}
                />
                
                <br/>
                <div style = {deckStyle}>
                Deck <button onClick = {this.save}>Save</button>
                <Deck 
                    cards = {this.state.deck} 
                    style = {deckStyle}
                    onMouseEnter = { this.onMouseEnter }
                    onDragStart = {this.onDragStart }
                    onDragEnd  = { this.onDragEnd }
                    onDrop = { this.onDrop }
                    onDragOver  = { this.onDragOver }
                    onRightclick = {this.onRightclick}
                />
                
                </div>
            </>
        )
    }


    /*Card functions

    onMouseEnter: this.onMouseEnter,
    onDragStart:this.onDragStart,
    onDragEnd : this.onDragEnd,
    onDrop: this.onDrop,
    onDragOver : this.onDragOver
    */

    isItemInDeck(cardId){
        for(let i = 0; i < this.state.deck.length; i++){
            if(this.state.deck[i].id === cardId){
                return true;
            }
        }
        return false;
    }
    onRightclick = () =>{
        if(this.state.hoveredCard.id != null && this.state.hoveredCard.index.charAt(0) === 'D'){
            const newColl = JSON.parse(JSON.stringify(this.state.collection));

            newColl.push(this.state.hoveredCard);

            this.setState({deck:this.state.deck.map((card)=>{
                if(card.id !== this.state.hoveredCard.id){
                    return card;
                }
                return this.state.defaultCard;
            }), collection:newColl,hoveredCard:{}});
            
        }
    }
    onMouseEnter = (card) => {
        if(card.id === -1) return;
        this.setState({hoveredCard: card})
    };

    onDragStart = (cardIndex) =>{
        const card = this.getCardFromIndex(cardIndex);
        this.setState({draggingCard:card});
    }
    onDragEnd = (e) =>{
        this.setState({draggingCard:null, hoveredCard:{}});
        
    }
    onDrop = (e) =>{
        
        if(this.state.hoveredCard.index !== undefined && this.state.hoveredCard.index.charAt(0) !== this.state.draggingCard.index.charAt(0) && !this.deckContainsCard(this.state.draggingCard)){
            //swap cards
            const card = this.getCardFromIndex(this.state.hoveredCard.index);
            if(card.id === -1){
                this.moveCard(this.state.draggingCard.index, this.state.hoveredCard.index);
            }
            else{
                this.swapCards(this.state.draggingCard.index,this.state.hoveredCard.index)
            }

        }
    }

    swapCards = (source, target) => {
          let t = this.getCardFromIndex(target)
          let s = this.getCardFromIndex(source)
          //debugger;

          this.copySrcToDest(source,target,s,t,this.copyDestToSrc);
    }
    copySrcToDest = (source,target,s,t,callback) =>{
      if(source.charAt(0) === "D"){
          const newDeck = this.state.deck.map((item)=>{
              if(item.cardId === s.id){
                  return JSON.parse(JSON.stringify(t));
              }
              else{
                  return item;
              }
          });
          // debugger;
          this.setState({deck:newDeck}, () => (callback(target,s,t)));
          // debugger;
      }
      else{
          const newColl = this.state.collection.map((item)=>{
              if(item === s){
                  return JSON.parse(JSON.stringify(t));
              }
              else{
                  return item;
              }
          });
          this.setState({collection:newColl}, () => (callback(target,s,t)));
      }
    }
    copyDestToSrc = (target,s,t) =>{
      if(target.charAt(0) === "D"){
          const newDeck = this.state.deck.map((item)=>{
              if(item === t){
                  return JSON.parse(JSON.stringify(s));
              }
              else{
                  return item;
              }
          });
          // debugger;
          this.setState({deck:newDeck});
          // debugger;
      }
      else{
          const newColl = this.state.collection.map((item)=>{
            if(item === t){
                return JSON.parse(JSON.stringify(s));
            }
              
            return item;
              
          });
          this.setState({collection:newColl},() => console.log(this.state.collection));
      }
    }

    moveCard = (fromIndex, toIndex) =>{
        console.log("movecard")
        const fromCard = this.getCardFromIndex(fromIndex);
        const newDeck = this.state.deck.map((item,index) =>{
            if(index === parseInt(toIndex.substring(1))){
                return fromCard;
            }

            return item;
            
        })

        const newColl = this.state.collection.filter((item,index) => index !== parseInt(fromIndex.substring(1)))
        this.setState({collection:newColl, deck:newDeck});
    }

    onDragOver = (event,cardIndex) =>{
        //check if card and dragging card are from different sets, collection vs deck
        event.preventDefault();
        if(this.state.draggingCard.index.charAt(0) !== cardIndex.charAt(0) && this.state.hoveredCard.index !== cardIndex){
            console.log(cardIndex)
            this.setState({hoveredCard:this.getCardFromIndex(cardIndex)})
        }

    }
    deckContainsCard = (card) =>{
        for(let i = 0; i < this.state.deck.length; i++){
            if(this.state.deck[i].id === card.id){
                return true;
            } 
        }
        return false;
    } 
    getCardFromIndex = (index) =>{
        console.log(index)
        const dataSource = index.charAt(0) == 'C'?this.state.collection:this.state.deck;
        console.log(dataSource)
        const card  = dataSource[parseInt(index.substring(1))];
        card.index = index;
        return card;
    }
    save = () =>{
        if(this.isFullDeck()){
            console.log("fullDeck")
            let deckIds = [];
            this.state.deck.forEach(card => deckIds.push(card.id))

            Axios.post("http://localhost:8888/api/saveDeck",
                { cardIds:deckIds}
            ).then(response => {
                alert(response.data.message)
            }).catch(reason => {
            //send message saying server is down
            alert(reason.response.data.message);
            })
        }
        else{
            alert("Not full deck")
        }
    }
    isFullDeck = () =>{
        let deck = this.state.deck;
        for(let i = 0; i <deck.length; i++){
            if(deck[i].id == -1){
                return false;
            }
        }
        return true;
    }
}
export default EditDeck;