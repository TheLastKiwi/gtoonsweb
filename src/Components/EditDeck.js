import React from 'react'
import Axios from 'axios'
import Deck from './Deck';
import Collection from './Collection'
import DisplayCard from './DisplayCard';

class EditDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deck:[{id:-1, name:"default"}],
            collection:[{id:-1, name:"default"}],
            hoveredCard:[]
        }
    }
    componentDidMount(){

        Axios.get("http://localhost:8888/api/getDeck")
        .then(response => {
            console.log("getDeckData")
            console.log(JSON.parse(response.data.message));
            this.setState({deck:JSON.parse(response.data.message)});
            
        })
        .catch(error => {
            
        });
        Axios.get("http://localhost:8888/api/getCollection")
        .then(response => {
            console.log("getCollData");
            console.log(JSON.parse(response.data.message));
            this.setState({collection:JSON.parse(response.data.message)});
            
        })
        .catch(error => {

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
                <DisplayCard hoveredCard = {this.state.hoveredCard} style={hovStyle}/>
                <Collection cards= {this.state.collection} onMouseEnter = {this.onMouseEnter}/>
                
                <br/>
                <div style = {deckStyle}>
                Deck <button onClick = {this.save}>Save</button>
                <Deck cards = {this.state.deck} style = {deckStyle}/>
                
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
onMouseEnter = (card) => {
    if(card.id === -1) return;
    //if(card.description == null) return;
    this.setState({hoveredCard: this.getCardDataFromCard(card)})
};
getCardDataFromCard = (card) =>{
    let retCard = {}

    retCard.name = card.name;
    retCard.color = card.color;
    retCard.description = card.description;
    retCard.rarity = card.rarity;
    //console.log(retCard)
    return retCard;
}

onDragStart = (card) =>{
    console.log("B"); 
}
onDragEnd = (e) =>{
    console.log("D");
}
onDrop = (e) =>{
    console.log("C");
}
onDragOver = (card) =>{
    console.log("E");
}
}
export default EditDeck;

