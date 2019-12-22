import React from 'react';
import Card from "./Card"
import { Column, Row } from 'simple-flexbox';
class Hand extends React.Component{



    render(){
        const handStyle = { //Absolute position of hand for now maybe later make it everything relative for smaller or larger screens
            position: 'absolute', //Also find out what flexGrow{1} is
            top : 400,
            left: 900
        }
        return(
        <>
            <Column style = {handStyle}>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDrag} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDrag} onDragEnd = {this.props.onDragEnd}/>
                </Row>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDrag} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDrag} onDragEnd = {this.props.onDragEnd}/>
                </Row>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDrag} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDrag} onDragEnd = {this.props.onDragEnd}/>
                </Row>
            </Column>
        </>
        )
    }
}
export default Hand;