import React from 'react';
import './Login.css';
import Button from './button';
import {useState, useContext} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { UserContext } from '../context/UserContext';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {User, setUser} = useContext(UserContext);

    function getUser(event) {
        setUsername(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    function TestToken() {
    
        axios.get('http://localhost:8000/test_token', {
            headers: {
                Authorization: 'Token ' + User.token
            }
        }).then(response => {
            console.log(response.data);
            setUser({...User, loggedin: true});
            return(true);
        }).catch(error => {
            console.log(error + ", token authentication failed!");
            setUser({...User, loggedin: false});
            return(false);
        });
    };

    function OnLogin() {
        console.log(username + " " + password);
        
        axios.post('http://localhost:8000/login',
            {
                username: username,
                password: password
            }
        ).then(response => {
            console.log("Login successful!")
            const user = {
                email: response.data.user.email,
                id: response.data.user.id,
                password: response.data.user.password,
                username: response.data.user.username,
                loggedin: true,
                token: response.data.token,
              }
            setUser(user)
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