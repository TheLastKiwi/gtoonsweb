import React from 'react'


class Card extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            dragging:false,
        }

        //id: this.props.cardInfo.id,
        // name: this.props.cardInfo.name,
        // rarity: this.props.cardInfo.rarity,
        // character: this.props.cardInfo.character,
        // description: this.props.cardInfo.description,
        // effects: this.props.cardInfo.effects,
        // attributes: this.props.cardInfo.attributes,
        // location: this.props.cardInfo.location,
        // color: this.props.cardInfo.color,
        // points: this.props.cardInfo.points,
        // nullified: this.props.cardInfo.nullified, //if nullified by another card of same name or character of lower value
        // owner: this.props.cardInfo.owner, //boolean if you own it
        // bonusPoints: this.props.cardInfo.bonusPoints,

        this.cardStyle = {
            float: "left", 
            width: "125px", 
            height: "125px",
            border: "1px solid #aaaaaa",
            backgroundImage: "url(https://static1.milkcapmania.co.uk/Img/pogs/Scandinavian%20Games%20A.S/Series%201/75DPI/34.png)" //default
        }
    }
    render (){
        let src = this.props.cardInfo.id===-1?"./images/Default.png":"./images/"+this.props.cardInfo.name+".png";
        return(
            <div>
            <img style={this.cardStyle} 
                src = {src}// + this.props.cardInfo.cardId}
                draggable = {this.props.cardInfo.id === -1?false:this.props.draggable}
                onMouseEnter = {this.props.onMouseEnter!==null?()=>(this.props.onMouseEnter(this.addIndexToCardInfo())):()=>{console.log("enterwasempty")}} 
                onDragStart = {this.dragStart}//{()=>(this.props.onDragStart(this.props.index))}
                onDragEnd = {this.dragEnd}//{()=>(this.props.onDragEnd(this.props.cardInfo))} 
                onDrop = {this.props.onDrop!=null?(event)=>this.props.onDrop(event,this.props.index):()=>{console.log("dropwasempty")}}
                onDragOver = {this.props.onDragOver!=null?(event)=>this.props.onDragOver(event,this.props.index):()=>{console.log("dragoverwasemtpy")}}
                onContextMenu = {this.onRightClick}
            />
            </div>
        )
    }
    addIndexToCardInfo = () =>{
        const card = this.props.cardInfo;
        card.index = this.props.index;
        return card;
    }
    dragStart = () =>{

        this.setState({dragging:true});
        if(this.props.onDragStart!=null){
            this.props.onDragStart(this.props.index);
        }
        
    }
    dragEnd = () =>{
        this.setState({dragging:false});
        if(this.props.onDragEnd!=null){
            this.props.onDragEnd(this.props.cardInfo);
        }
    }
    onRightClick = (e) =>{
        e.preventDefault();
        if(this.props.onRightclick != null){
            this.props.onRightclick();
        }
    }
}
export default Card;