import React from 'react'
import { Row } from 'simple-flexbox';
import Card from './Card';

class Deck extends React.Component{

    getCardsForDeck = () =>{
        let deck = [];
        const template = {id:-1, name:"", desription:"",rarity:"",color:""};
        let row = [];
        for(let i = 0; i < 12; i++){
            //generate template cards
            if(i<this.props.cards.length){
                row.push(
                    <Card 
                        onMouseEnter = { this.props.onMouseEnter }
                        onDragStart = {this.props.onDragStart }
                        onDragEnd  = { this.props.onDragEnd }
                        onDrop = { this.props.onDrop }
                        onDragOver  = { this.props.onDragOver }
                        onRightclick = {this.props.onRightclick}
                        index = {"D"+(i).toString()}
                        cardInfo = {this.props.cards[i]}
                    />
                );
            }
            else{
                row.push(
                    <Card 
                        onMouseEnter = { this.props.onMouseEnter }
                        onDragStart = {this.props.onDragStart }
                        onDragEnd  = { this.props.onDragEnd }
                        onDrop = { this.props.onDrop }
                        onDragOver  = { this.props.onDragOver }
                        onRightclick = {this.props.onRightclick}
                        index = {"D"+i.toString()}
                        cardInfo = {template}
                        
                    />
                );

            }
            if(row.length === 3){
                deck.push(
                    <Row>
                        {row}
                    </Row>
                );
                row = [];
            }
        }
        
        return deck;
    }
    render(){
        return(
            <>
                {this.getCardsForDeck()}
            </>
        )
    }
}
export default Deck;