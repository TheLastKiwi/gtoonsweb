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
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                </Row>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                </Row>
                <button>No</button><button>Ready</button><button>Yes</button>
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                </Row>
                <Row  style = {offsetLeftStyle}>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd}/>
                </Row>
            </>
        )
    }
}

export default Board;
