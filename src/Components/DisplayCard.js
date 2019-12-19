import React from 'react'

class DisplayCard extends React.Component{
    constructor(props){
        super(props)
        console.log("DisplayCard constructor")
        console.log(props.hoveredCard.src)
        
    }
    render (){
        console.log("DisplayCard render:" + this.props.hoveredCard.src)
        return(
            <div>
                <img src = {this.props.hoveredCard.src}></img><br/>
                Name: {this.props.hoveredCard.name}<br/>
                Color: {this.props.hoveredCard.color}<br/>
                Power: {this.props.hoveredCard.description}
            </div>
        )
    }
}
export default DisplayCard;