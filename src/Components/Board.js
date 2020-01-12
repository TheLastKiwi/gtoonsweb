import React from 'react';
import { Row } from 'simple-flexbox';
import Card from "./Card"
class Board extends React.Component{


    onDragOver = () =>{
        return null;
    }
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

            <div style = {{...this.props.style}}>
                <Row style = {offsetLeftStyle}>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[4]}onDragOver = {this.onDragOver}/>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[5]}onDragOver = {this.onDragOver}/>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[6]}onDragOver = {this.onDragOver}/>
                </Row>
                <Row>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[0]}onDragOver = {this.onDragOver}/>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[1]}onDragOver = {this.onDragOver}/>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[2]}onDragOver = {this.onDragOver}/>
                    <Card draggable="false" onMouseEnter = {this.props.onMouseEnter} cardInfo = {this.props.oppCardInfo[3]}onDragOver = {this.onDragOver}/>
                </Row>
                
                {this.props.lastCard?(<button style={{position:"relative", left:"10%"}} onClick = {this.props.onNoClick}>No</button>):null} 
                {
                //if
                this.props.ready?
                    //then
                    <div style={{position:"relative", left:"16.5%"}} >Waiting for opponent...</div>:
                    //else
                        //if
                        (this.props.lastcard?
                            //then
                            (<button style={{position:"relative", left:"15%"}} onClick = {this.props.onReadyClick}>Ready</button>):
                            //else    
                                <button style={{position:"relative", left:"20%"}} onClick = {this.props.onReadyClick}>Ready</button>)}
                {this.props.lastCard?(<button style={{position:"relative", left:"20%"}} onClick = {this.props.onYesClick}>Yes</button>):null}
                
                <Row>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[0]} 
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B0"}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[1]}
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B1"}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[2]} 
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B2"}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[3]} 
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B3"}/>
                </Row>
                <Row  style = {offsetLeftStyle}>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[4]} 
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B4"}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[5]} 
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B5"}/>
                    <Card onMouseEnter = {this.props.onMouseEnter} onDragStart = {this.props.onDragStart} onDragEnd = {this.props.onDragEnd} cardInfo = {this.props.myCardInfo[6]} 
                    onDrop = {this.props.onDrop} onDragOver = {this.props.onDragOver} index={"B6"}/>
                </Row>
            </div>
        )
    }
}

export default Board;
