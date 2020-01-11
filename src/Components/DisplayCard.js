import React from 'react'

class DisplayCard extends React.Component{
    constructor(props){
        super(props)       
    }
    
    render (){
        let cardStyle = {
            width: "150px", 
            height: "275px",
            border: "1px solid #aaaaaa"
        }

        return(
            
            <div style = {{...cardStyle, ...this.props.style}}>
                <img src = {("./images/") + (this.props.hoveredCard.name!=null?this.props.hoveredCard.name:"Default") + ".png"} draggable={false}/><br/>
                Name: {this.props.hoveredCard.name}<br/>
                Color: {this.props.hoveredCard.color}<br/>
                Rarity:{this.props.hoveredCard.rarity}<br/>
                Power: {this.props.hoveredCard.description}
            </div>
        )
    }
}
export default DisplayCard;