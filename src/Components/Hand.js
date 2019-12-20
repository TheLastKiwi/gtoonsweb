import React from 'react';
import Card from "./Card"
import { Column, Row } from 'simple-flexbox';
class Hand extends React.Component{



    render(){
        const handStyle = { //Absolute position of hand for now maybe later make it everything relative for smaller or larger screens
            position: 'absolute', //Also find out what flexGrow{1} is
            top : 500,
            left: 1200
        }
        return(
        <>
            <Column flexGrow={1} style = {handStyle}>
                <Row>
                    <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
                </Row>
                <Row>
                    <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
                </Row>
                <Row>
                    <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
                </Row>
            </Column>
        </>
        )
    }
}
export default Hand;