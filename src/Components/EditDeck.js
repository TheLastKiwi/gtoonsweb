import React from 'react'
import Axios from 'axios'
import { Row } from 'simple-flexbox';
import Card from './Card';

class EditDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deck:[{id:-1, name:"default"}],
            collection:[{id:-1, name:"default"}]
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
    generateCollectionList = () =>{
        let rowSize = 10;
        let resp = [];
        console.log("collLen")
        console.log(this.state.collection.length)
        //collections is a list of full cards
        for(let i = 0; i < this.state.collection.length; i+=rowSize){
            resp.push(<Row>{this.getCardsForCollectionRow(i,rowSize)}</Row>);
        }
        return resp;
    }
    getCardsForCollectionRow = (start, rowSize) =>{
        let theRow = [];
        for(let i = start; i < this.state.collection.length; i++){
            theRow.push(
                <Card 
                    cardInfo = {this.state.collection[i]}
                    onMouseEnter = { this.onMouseEnter }
                    onDragStart = {this.onDragStart }
                    onDragEnd  = { this.onDragEnd }
                    onDrop = { this.onDrop }
                    onDragOver  = { this.onDragOver }
                />)
            if(theRow.length == rowSize){
                break;
            }
        }
        return theRow;
    }
    getCardsForDeck = () =>{
        let deck = [];
        if(this.state.deck.length === 12){
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
                        cardInfo = {this.state.deck[i]}
                    />
                    <Card 
                        onMouseEnter = { this.onMouseEnter }
                        onDragStart = {this.onDragStart }
                        onDragEnd  = { this.onDragEnd }
                        onDrop = { this.onDrop }
                        onDragOver  = { this.onDragOver }
                        cardInfo = {this.state.deck[i+1]}/>
                    <Card 
                        onMouseEnter = { this.onMouseEnter }
                        onDragStart = {this.onDragStart }
                        onDragEnd  = { this.onDragEnd }
                        onDrop = { this.onDrop }
                        onDragOver  = { this.onDragOver }
                        cardInfo = {this.state.deck[i+2]}/>
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
            <br/>
            Collection
            {this.generateCollectionList()}
            <br/>
            Deck
            {this.getCardsForDeck()}
            <button onClick = {this.save}>Save</button>
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
onMouseEnter = (card) =>{
    console.log("A");
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

