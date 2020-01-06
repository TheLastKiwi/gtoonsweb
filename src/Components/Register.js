import Axios from "axios"
import React from 'react'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            username:"",
            password:""
        }
    }
    render(){
        return(
            <div>
                Register<br/>
                Email: <input type = "text" onChange = {(e) => this.setState({email:e.target.value})}></input>
                <br/>
                Username: <input type = "text" onChange = {(e) => this.setState({username:e.target.value})}></input>
                <br/>
                Password: <input type = "password" onChange = {(e) =>{
                     this.setState({password:e.target.value},console.log(e.target.value))
                    
                     }}></input>
                <br/>
                <button onClick = {this.register}>Register</button>
                <br/>
                Already registered? <a href = "/login">Click here to log in </a>
            </div>
        
        )
    }

    register = () =>{
        let data = {
            email:this.state.email,
            username:this.state.username,
            password:this.state.password
        }
        let headers = {
            'Access-Control-Allow-Origin': '*'
        }
    
        console.log(data);
        Axios.post("http://localhost:8888/api/auth/register",
            {
                ...data
            },
            {
                ...headers
            }
        ).then(response => {
            //notify user of successful registartion
            alert("Registration Success")
            window.location.replace("/login");
        }).catch(reason => {
            //send message saying server is down
            console.log(reason.response.data);
        })
        
    }
}
export default Register;