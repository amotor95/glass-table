import React from 'react';
import './Login.css';
import Button from './button';
import {useState, useContext} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import { FuncContext } from '../context/FuncContext';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {User, setUser} = useContext(UserContext);
    const {currentScreen, setCurrentScreen} = useContext(FuncContext)

    function getUser(event) {
        setUsername(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    function TestToken() {
    
        axios.get('https://glass-table-production.up.railway.app/test_token', {
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
        
        axios.post('https://glass-table-production.up.railway.app/login',
            {
                username: username,
                password: password
            }
        ).then(response => {
            console.log("Login successful!")
            const user = {
                // email: response.data.user.email,
                id: response.data.user.id,
                password: response.data.user.password,
                username: response.data.user.username,
                loggedin: true,
                token: response.data.token,
              }
            setCurrentScreen("Watchlist")
            setUser(user)
        }).catch(error => {console.log(error + ", Login Failed!")});
    
        
    
        return(console.log("OnLogin function concluded!"));
    
    };

    function OnGuestLogin() {
        
        axios.post('https://glass-table-production.up.railway.app/login',
            {
                username: "jsmith",
                password: "guestpassword123"
            }
        ).then(response => {
            console.log("Guest login successful!")
            const user = {
                // email: response.data.user.email,
                id: response.data.user.id,
                password: response.data.user.password,
                username: response.data.user.username,
                loggedin: true,
                token: response.data.token,
              }
            setCurrentScreen("Watchlist")
            setUser(user)
        }).catch(error => {console.log(error + ", Login Failed!")});
    
        
    
        return(console.log("OnLogin function concluded!"));
    
    };

        return(
            <div className="login-box">
                <div className= "login-page">
                    <div className= "login-title">Log In</div>
                    <div className= "login-inputs">
                        <input className= "login-input-text" onChange={getUser} type="text" placeholder='Username'/>
                        <input className= "login-input-text" onChange={getPassword} type="password" placeholder="Password"/>
                    </div>
                    <div className="login-button-div"><Button className="login-button" text="Login" onClick={() => OnLogin()}></Button></div>
                    <div className="guest-button-div"><Button className="guest-button" text="Guest Login" onClick={() => OnGuestLogin()}></Button></div>
                </div>
            </div>
        );
}


export default Login;