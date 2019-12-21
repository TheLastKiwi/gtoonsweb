import React from 'react';
import { Row } from 'simple-flexbox';
import Card from "./Card"
class Board extends React.Component{



    render(){

            const offsetLeftStyle = {
                position: 'relative',
                left: 63
            }
            const offsetGapStyle = {
                position: 'relative',
                top: 75
            }

        return(

            /*
             O O O
            O O O O
            Buttons and countdown sometimes visible such as yes/no replace and ready
            O O O O
             O O O

            */

            <>
                <Row style = {offsetLeftStyle}>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                </Row>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                </Row>
                <button>No</button><button>Ready</button><button>Yes</button>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                </Row>
                <Row  style = {offsetLeftStyle}>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.cardDragEnd}/>
                </Row>
            </>
        )
    }
}

export default Board;
