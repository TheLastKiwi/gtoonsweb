import React from 'react'
import { Row } from 'simple-flexbox';
import Card from './Card';

class Deck extends React.Component{

    constructor(props){
        
        super(props)
    }
    getCardsForDeck = () =>{
        let deck = [];
        if(this.props.cards.length === 12){
            for(let i = 0; i < 12; i+=3){
                //generate template cards
                deck.push(
                <Row>
                    <Card 
                        onMouseEnter = { this.onMouseEnter }
                        onDragStart = {this.onDragStart }
                        onDragEnd  = { this.onDragEnd }
                        onDrop = { this.onDrop }
                        onDragOver  = { this.onDragOver }
                        cardInfo = {this.props.cards[i]}
                    />
                    <Card 
                        onMouseEnter = { this.onMouseEnter }
                        onDragStart = {this.onDragStart }
                        onDragEnd  = { this.onDragEnd }
                        onDrop = { this.onDrop }
                        onDragOver  = { this.onDragOver }
                        cardInfo = {this.props.cards[i+1]}/>
                    <Card 
                        onMouseEnter = { this.onMouseEnter }
                        onDragStart = {this.onDragStart }
                        onDragEnd  = { this.onDragEnd }
                        onDrop = { this.onDrop }
                        onDragOver  = { this.onDragOver }
                        cardInfo = {this.props.cards[i+2]}/>
                </Row>);
            }
        }
        else{
            let template = {id:-1,src:""}
            for(let i = 0; i < 12; i+=3){
                //generate template cards
                deck.push(
                <Row>
                    <Card cardInfo = {template}
                    onMouseEnter = { this.onMouseEnter }
                    onDragStart = {this.onDragStart }
                    onDragEnd  = { this.onDragEnd }
                    onDrop = { this.onDrop }
                    onDragOver  = { this.onDragOver }/>
                    <Card cardInfo = {template}
                    onMouseEnter = { this.onMouseEnter }
                    onDragStart = {this.onDragStart }
                    onDragEnd  = { this.onDragEnd }
                    onDrop = { this.onDrop }
                    onDragOver  = { this.onDragOver }/>
                    <Card cardInfo = {template}
                    onMouseEnter = { this.onMouseEnter }
                    onDragStart = {this.onDragStart }
                    onDragEnd  = { this.onDragEnd }
                    onDrop = { this.onDrop }
                    onDragOver  = { this.onDragOver }/>
                </Row>);
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