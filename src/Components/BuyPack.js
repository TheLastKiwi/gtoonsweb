import React from 'react'
import Axios from 'axios'
import Card from './Card';
import DisplayCard from './DisplayCard'
class BuyPack extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            pack:[],
            points:0,
            hoveredCard:[]
        }
    }
    componentDidMount(){

        Axios.get("http://localhost:8888/api/getPoints")
        .then(response => {
            this.setState({points:response.data.message});
            
        })
        .catch(error => {
            
        });
    }
    buyPack = () =>{
        Axios.post("http://localhost:8888/api/buyPack")
        .then(response => {
            const objResp = JSON.parse(response.data.message);  
            this.setState({pack:objResp, points:this.state.points-200})
        })
        .catch(error =>{
            alert(error)
        })
    }
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
    
    render(){
        let divPack = [];
        this.state.pack.forEach((obj) =>{
            divPack.push(<Card cardInfo = {obj} onMouseEnter = {this.onMouseEnter} draggable = {false}/>)
        })
        return(
            <>
                Your points: {this.state.points}
                <br/>
                <DisplayCard hoveredCard = {this.state.hoveredCard}/>
                <button onClick = {this.buyPack}>Buy Pack (Cost 200 points)</button>
                <br/>
                {divPack}
            </>
        )
    }
}

export default BuyPack;