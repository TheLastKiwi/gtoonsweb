import React from 'react'
import Card from './Card'
import { Row } from 'simple-flexbox'
class Discard extends React.Component{
    render(){
        return(
            <div style = {this.props.style}>
                Discard
                <Row>
                    <Card cardInfo = {this.props.cardInfo[0]} index = {"T0"} onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}
                        onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver}/>
                    <Card cardInfo = {this.props.cardInfo[1]} index = {"T1"} onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}
                        onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver}/>
                </Row>
            </div>
        )
    }
}
export default Discard;