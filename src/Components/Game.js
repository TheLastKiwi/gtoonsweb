import React from 'react';
import DisplayCard from "./DisplayCard"
import Hand from "./Hand"
import axios from 'axios';
import Board from './Board';
class Game extends React.Component{

    constructor(props){
        super(props)
        this.state={hoveredCard: {
            name: "OrangeName",
            description: "BlueDesc",
            attributes: "MaleAttr",
            color: "RedColor",
            src:"https://static1.milkcapmania.co.uk/Img/pogs/Series1/75DPI/01.png"
          }
        }
        //Todo find out why these aren't being set in props for board -> hand +card to use
    }

    onMouseEnter = (card) => {
        console.log(card);
        //if(card.description == null) return;
        this.setState({hoveredCard: {src: card.src, color: "blue", description:"gets big", name:"skullguy"}})
        console.log("hovered: " + this.state.hoveredCard + " - " + card.src)
    };
    
      onDragStart = (card) => {
        if(card.description == null) return;
        
      };
      onDragEnd = (card) => {
        if(card.description == null) return;
        let info;
        console.log("cardDragEnd")
        axios.post("localhost:8888/register","").then(function(response){
          if(response.status === 200){
            console.log(response.data);
          }
        })
        console.log("info = " + info)
      }
      render(){

        return(
            <>
                <Board onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}/><DisplayCard hoveredCard={this.state.hoveredCard} onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}/>
                <Hand onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}/>
            </>
        )
    }

}
export default Game;