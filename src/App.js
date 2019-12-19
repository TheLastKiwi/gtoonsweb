import React from 'react';
import Card from "./Components/Card"
import DisplayCard from "./Components/DisplayCard"
import axios from 'axios';

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
        <Card onMouseEnter = {this.mouseEnter} onDragStart = {this.cardDrag} onDragEnd = {this.cardDragEnd}/>
      </>
    )
  };

  mouseEnter(card){
    this.setState({hoveredCard: {src: card.src, color: "blue", description:"gets big", name:"skullguy"}})
    console.log("hovered: " + this.state.hoveredCard + " - " + card.src)
  }

  cardDrag(card){
    
  }
  cardDragEnd(card){
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
