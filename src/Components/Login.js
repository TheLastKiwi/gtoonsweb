import Axios from "axios"
import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:""
        }
    }
    render(){
        return(
            <div>
                Log In<br/>
                Username: <input type = "text" onChange = {(e) => this.setState({username:e.target.value})}></input>
                <br/>
                Password: <input type = "password" onChange = {(e) => this.setState({password:e.target.value})}></input>
                <br/>
                <button onClick = {this.login}>Login</button>
                <br/>
                Not registered? <a href = "/register">Click here to register </a>
            </div>
        
        )
    }

    login = () =>{

            let headers = {
                'Access-Control-Allow-Origin': '*'
            }
            let data= {
                username:this.state.username,
                password:this.state.password
            }
        
        let token = "";
        
        Axios.post("http://localhost:8888/api/auth/login",
        {
            ...data
        },
        {
            ...headers
        }
        ).then(response => {
                token = response.data.token;
                console.log(token);
                localStorage.setItem("jwt",token);
                window.location.replace("/");
        }).catch(reason => {
            //send message saying server is down
            alert(reason.response.data.message);
        })
        
    }
}
export default Login;