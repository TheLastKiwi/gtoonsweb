import React from 'react'


class Card extends React.Component{

    constructor(props){
        console.log("Card constructor")
        super(props)
        console.log(props.cardInfo)
        this.state = {
            dragging:false
        }
        // this.state = {
        //     id: this.props.cardInfo.id,
        //     // name: this.props.cardInfo.name,
        //     // rarity: this.props.cardInfo.rarity,
        //     // character: this.props.cardInfo.character,
        //     // description: this.props.cardInfo.description,
        //     // effects: this.props.cardInfo.effects,
        //     // attributes: this.props.cardInfo.attributes,
        //     // unappliedEffects: this.props.cardInfo.unappliedEffects,
        //     // location: this.props.cardInfo.location,
        //     // color: this.props.cardInfo.color,
        //     // points: this.props.cardInfo.points,
        //     // nullified: this.props.cardInfo.nullified, //if nullified by another card of same name or character of lower value
        //     // owner: this.props.cardInfo.owner, //boolean if you own it
        //     // bonusPoints: this.props.cardInfo.bonusPoints,
        //     src: this.props.cardInfo.src //"https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png" //eventually it will be "./images/small/" + name +".png" 
        // }
        this.cardStyle = {
            float: "left", 
            width: "125px", 
            height: "125px",
            border: "1px solid #aaaaaa",
            backgroundImage: "url(https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png)" //default
        }
    }

    render (){
        let src = this.props.cardInfo.id==-1?"./images/a.png":"./images/"+this.props.cardInfo.name+".png";
        return(
            <div
            onMouseEnter = {()=>(this.props.onMouseEnter(this.props.cardInfo))} 
            onDragStart = {this.dragStart}//{()=>(this.props.onDragStart(this.props.index))}
            onDragEnd = {this.dragEnd}//{()=>(this.props.onDragEnd(this.props.cardInfo))} 
            onDrop = {(event)=>this.props.onDrop(event,this.props.index)}
            onDragOver = {(event)=>this.props.onDragOver(event,this.props.index)}
            >
            <img style={this.cardStyle} 
                src = {src}// + this.props.cardInfo.cardId}
                draggable={this.props.cardInfo.id === -1?false:this.props.draggable}
            />
            </div>
        )
    }
    dragStart = () =>{
        this.props.onDragStart(this.props.index)
        this.setState({dragging:true});
    }
    dragEnd = () =>{
        this.setState({dragging:false});
        this.props.onDragEnd(this.props.cardInfo)
    }
    

}
export default Card;