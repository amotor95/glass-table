import React from 'react';
import './Login.css';
import Button from './button';
import {useState, useContext} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { UserContext } from '../context/UserContext';

function TestToken({token}) {
    axios.get('http://localhost:8000/login/test_token', {
        headers: {
            Authorization: 'Token ' + token
        }
    }).then(response => {
        console.log(response.data);
        return(true);
    }).catch(error => {
        console.log(error + ", token authentication failed!");
        return(false);
    });
};


export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const {LoggedIn, setLoggedIn} = useContext(UserContext);

    function getUser(event) {
        setUsername(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    function OnLogin() {
        //const [token, setToken] = useState("");

        console.log(username + " " + password);
    
        axios.post('http://localhost:8000/login',
            {
                username: username,
                password: password
            }
        ).then(response => {
            console.log("Login successful!")
            setToken(response.data.token)
            console.log(response.data.user)
            setLoggedIn(true)
        }).catch(error => {console.log(error + ", Login Failed!")});
    
        
    
        return(console.log("OnLogin function concluded!"));
    
    };

        return(
            <div className= "functional-box">
            <div className= "login-page">
            <div className= "login-title">Log In</div>
            <div className= "inputs">
                <input className= "input-text" onChange={getUser} type="text" placeholder='Username'/>
                <input className= "input-text" onChange={getPassword} type="password" placeholder="Password"/>
            </div>
            <div className="button-div"><Button className="login-button" text="Login" onClick={() => OnLogin()}></Button></div>
            </div>
            </div>
        );
}


export default Login;