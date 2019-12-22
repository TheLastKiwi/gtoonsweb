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
          },
          phase: 2,
          handCards :[],
          myField:[],
          oppField:[]
          }

         /*
            Need a timer for:
            1- show random card to move on to next screen -10 seconds
            2- to play first 4 cards - 45 seconds
            3- to play second 3 cards - 45 seconds
            4- to replace last card //can just be one long timer - 20 seconds
            5- to delay showing the final results? - 5 seconds
         */
    }
    setTimerInterval = () => {
        this.setState({
            time: Date.now() - this.state.start
        })
    }

    startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(this.setTimerInterval(), 1);
      }
      stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }


    onMouseEnter = (card) => {
        console.log(card);
        //if(card.description == null) return;
        this.setState({hoveredCard: {src: card.src, color: "blue", description:"gets big", name:"skullguy"}})
        console.log("mouseEnter: " + this.state.hoveredCard + " - " + card.src)
    };
    
      onDragStart = (card) => {
          console.log("dragStart")
        if(card.description == null) return;
        
      };
      onDragEnd = (card) => {
        // if(card.description == null) return;
        let info;
        console.log("cardDragEnd")
        // axios.post("localhost:8888/register","").then(function(response){
        //   if(response.status === 200){
        //     console.log(response.data);
        //   }
        // })
        console.log("info = " + info)
      }
      render(){
        let phase = this.state.phase
        let display = null;
        switch(phase){
            case 0:
                console.log("phase 0")//matchmaking
                break;
            case 1:
                console.log("phase 1")//PickColor
                break;
            case 2:
                display = 
                <>
                    <Board onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}/><DisplayCard hoveredCard={this.state.hoveredCard} onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}/>
                    <Hand onMouseEnter = {this.onMouseEnter} onDragStart ={this.onDragStart} onDragEnd = {this.onDragEnd}/>
                </>

        }
        
        return(
            <>
                {display}
            </>
        )
    }

}
export default Game;