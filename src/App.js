import React from 'react';
import DisplayCard from "./Components/DisplayCard"
import Hand from "./Components/Hand"
import axios from 'axios';
import { Column, Row } from 'simple-flexbox';
import Board from './Components/Board';

class App extends React.Component {
  constructor(props){
    super(props)
    console.log("App constructor");
    this.state={hoveredCard: {
      name: "OrangeName",
      description: "BlueDesc",
      attributes: "MaleAttr",
      color: "RedColor",
      src:"https://static1.milkcapmania.co.uk/Img/pogs/Series1/75DPI/01.png"
    }
  };
  this.mouseEnter = this.mouseEnter.bind(this);
  this.cardDragEnd = this.cardDragEnd.bind(this);
}
    
  render(){
    console.log("app render " + this.state.hoveredCard.name);

    

    return (
    <>
      
      <DisplayCard hoveredCard={this.state.hoveredCard}/>
      <Board />
      <Hand />

      </>
    )
  };

  mouseEnter(card){
    if(card.description == null) return;
    this.setState({hoveredCard: {src: card.src, color: "blue", description:"gets big", name:"skullguy"}})
    console.log("hovered: " + this.state.hoveredCard + " - " + card.src)
  }

  cardDrag(card){
    if(card.description == null) return;
    
  }
  cardDragEnd(card){
    if(card.description == null) return;
    let info;
    console.log("cardDragEnd")
    axios.post("localhost:8888/register","").then(function(response){
      if(response.status == 200){
        console.log(response.data);
      }
    })
    console.log("info = " + info)
  }

}

export default App;
