import React from 'react'

class Card extends React.Component{

    constructor(props){
        console.log("Card constructor")
        super(props)
        this.state = {
            name: this.props.name,
            rarity: this.props.rarity,
            character: this.props.character,
            description: this.props.description,
            effects: this.props.effects,
            attributes: this.props.attributes,
            unappliedEffects: this.props.unappliedEffects,
            location: this.props.location,
            color: this.props.color,
            points: this.props.points,
            nullified: this.props.nullified, //if nullified by another card of same name or character of lower value
            owner: this.props.owner, //boolean if you own it
            bonusPoints: this.props.bonusPoints,
            src: "https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png" //eventually it will be "./images/small/" + name +".png" 
        }
    }
    
    render (){
        console.log("Card render " + this.state.src)
        return(
            <div>
                <img src = {this.state.src} onMouseEnter = {()=>(this.props.onMouseEnter(this.state))} onDragEnd = {()=>(this.props.onDragEnd(this.state))}></img>
            </div>
        )
    }

}
export default Card;