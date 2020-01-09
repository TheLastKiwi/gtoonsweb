import React from 'react'
import Axios from 'axios'
import Card from './Card';
class BuyPack extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            pack:[],
            points:0
        }
    }
    componentDidMount(){

        Axios.get("http://localhost:8888/api/getPoints")
        .then(response => {
            console.log(response.message);
            this.setState({points:response.data.message});
            
        })
        .catch(error => {
            
        });
    }
    buyPack = () =>{
        Axios.post("http://localhost:8888/api/buyPack")
        .then(response => {
            const objResp = JSON.parse(response.data.message);
            console.log(objResp);
            let divPack = [];
            objResp.forEach((obj) =>{
                divPack.push(<Card cardInfo = {obj}/>)
            })
            this.setState({pack:divPack})
        })
        .catch(error =>{
            alert(error)
        })
    }
    render(){
        return(

            <>
                Your points: {this.state.points}
                <br/>
                <button onClick = {this.buyPack}>Buy Pack (Cost 200 points)</button>
                <br/>
                {this.state.pack}
            </>
        )
    }
}
export default BuyPack;