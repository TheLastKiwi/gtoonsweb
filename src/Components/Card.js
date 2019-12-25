import React from 'react'

class Card extends React.Component{

    constructor(props){
        console.log("Card constructor")
        super(props)
        this.state = {
            id: this.props.cardInfo.id,
            // name: this.props.cardInfo.name,
            // rarity: this.props.cardInfo.rarity,
            // character: this.props.cardInfo.character,
            // description: this.props.cardInfo.description,
            // effects: this.props.cardInfo.effects,
            // attributes: this.props.cardInfo.attributes,
            // unappliedEffects: this.props.cardInfo.unappliedEffects,
            // location: this.props.cardInfo.location,
            // color: this.props.cardInfo.color,
            // points: this.props.cardInfo.points,
            // nullified: this.props.cardInfo.nullified, //if nullified by another card of same name or character of lower value
            // owner: this.props.cardInfo.owner, //boolean if you own it
            // bonusPoints: this.props.cardInfo.bonusPoints,
            src: this.props.cardInfo.src //"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png" //eventually it will be "./images/small/" + name +".png" 
        }
        this.cardStyle = {
            float: "left", 
            width: "125px", 
            height: "125px",
            border: "1px solid #aaaaaa"
        }
    }
    componentWillReceiveProps = (nextProps) =>{
        // debugger;
        console.log("updRec")
        if( this.state.id === nextProps.cardInfo.id) return;
        console.log("gotUpdates here are the props")
        console.log(nextProps)
        this.setState({ ...nextProps.cardInfo });  
    }
    render (){
        return(
            <div >
                <img style={this.cardStyle} src = {this.state.src} onMouseEnter = {()=>(this.props.onMouseEnter(this.state))} onDragStart = {()=>(this.props.onDragStart(this.props.index))}
                onDragEnd = {()=>(this.props.onDragEnd(this.state))} onDrop = {(event)=>this.props.onDrop(event,this.props.index)}
                 onDragOver = {(event)=>this.props.onDragOver(event,this.props.index)}
                draggable={this.state.id === -1?false:this.props.draggable}></img>
            </div>
        )
    }
    

}
export default Card;