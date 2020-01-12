import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Axios from 'axios';

Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('jwt');
    config.headers.Authorization = "JWT " + token;
    return config;
});
ReactDOM.render(<Home />, document.getElementById('root'));


