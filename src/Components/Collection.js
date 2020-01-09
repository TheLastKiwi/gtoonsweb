import React from 'react'
import { Row } from 'simple-flexbox';
import Card from './Card';

class Collection extends React.Component{

    constructor(props){
        
        super(props)
    }
    generateCollectionList = () =>{
        let rowSize = 10;
        let resp = [];
        console.log("collLen")
        console.log(this.props.cards.length)
        //collections is a list of full cards
        for(let i = 0; i < this.props.cards.length; i+=rowSize){
            resp.push(<Row>{this.getCardsForCollectionRow(i,rowSize)}</Row>);
        }
        return resp;
    }
    getCardsForCollectionRow = (start, rowSize) =>{
        let theRow = [];
        for(let i = start; i < this.props.cards.length; i++){
            theRow.push(
                <Card 
                    cardInfo = {this.props.cards[i]}
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
    render(){
        return(
            <>
            {this.generateCollectionList()}
            </>
        )
    }
}
export default Collection;