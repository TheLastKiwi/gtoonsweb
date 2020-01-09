import React from 'react'

class DisplayCard extends React.Component{
    constructor(props){
        super(props)       
    }
    
    render (){
        let cardStyle = {
            float: "left", 
            width: "150px", 
            height: "275px",
            border: "1px solid #aaaaaa"
        }

        return(
            
            <div style = {cardStyle}>
                <img src = {this.props.hoveredCard.name!=null?"./images/" + this.props.hoveredCard.name + ".png":null} draggable={false}/><br/>
                Name: {this.props.hoveredCard.name}<br/>
                Color: {this.props.hoveredCard.color}<br/>
                Rarity:{this.props.hoveredCard.rarity}<br/>
                Power: {this.props.hoveredCard.description}
            </div>
        )
    }
}
export default DisplayCard;