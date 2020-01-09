import React from 'react'
import Axios from 'axios'
import Deck from './Deck';
import Collection from './Collection'

class EditDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deck:[{id:-1, name:"default"}],
            collection:[{id:-1, name:"default"}]
        }
    }
    componentDidMount(){

        Axios.get("http://localhost:8888/api/getDeck")
        .then(response => {
            console.log("getDeckData")
            console.log(JSON.parse(response.data.message));
            this.setState({deck:JSON.parse(response.data.message)});
            
        })
        .catch(error => {
            
        });
        Axios.get("http://localhost:8888/api/getCollection")
        .then(response => {
            console.log("getCollData");
            console.log(JSON.parse(response.data.message));
            this.setState({collection:JSON.parse(response.data.message)});
            
        })
        .catch(error => {

        });
    }

    render(){
        return(
            <>
            <br/>
            Collection
            <Collection cards= {this.state.collection}/>
            <br/>
            Deck
            <Deck cards = {this.state.deck}/>
            <button onClick = {this.save}>Save</button>
            </>
        )
    }


/*Card functions

onMouseEnter: this.onMouseEnter,
onDragStart:this.onDragStart,
onDragEnd : this.onDragEnd,
onDrop: this.onDrop,
onDragOver : this.onDragOver
*/
onMouseEnter = (card) =>{
    console.log("A");
}
onDragStart = (card) =>{
    console.log("B"); 
}
onDragEnd = (e) =>{
    console.log("D");
}
onDrop = (e) =>{
    console.log("C");
}
onDragOver = (card) =>{
    console.log("E");
}
}
export default EditDeck;

