import React from 'react';
import './Signup.css';
import Button from './button';
import {useState, useContext} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import { FuncContext } from '../context/FuncContext';

export function Signup() {
    // const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const {User, setUser} = useContext(UserContext);
    const {currentScreen, setCurrentScreen} = useContext(FuncContext);
    const [ShowPassword, setShowPassword] = useState(false);
    const [Error, setError] = useState("Unknown Error");
    const [ShowError, setShowError] = useState(false);

    function toggleShowPassword() {
        setShowPassword(!ShowPassword);
    }

    function getUsername(event) {
        setUsername(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    // function getEmail(event) {
    //     setEmail(event.target.value);
    // }

    function getFirstName(event) {
        setFirstName(event.target.value);
    }

    function getLastName(event) {
        setLastName(event.target.value);
    }

    function OnSignup() {
        //''http://localhost:8000/signup''
        axios.post('https://glass-table-production.up.railway.app/signup',
            {
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name,
            }
        ).then(response => {
            console.log("Signup successful!")
            const user = {
                username: response.data.user.username,
                loggedin: true,
                token: response.data.token,
              }
            setCurrentScreen("Watchlist")
            setUser(user)
        }).catch(error => {
            console.log(error);
            const errorMessage = error.response?.data?.error?.[0] || error.message || error.toString(); 
            console.log(errorMessage + ", Signup Failed!");
            setError(errorMessage);
            setShowError(true);
        });
        return(console.log("OnSignup function concluded!"));
    };

        return(
            <div className= "signup-screen">
                <div className= "signup-page">
                    <div className= "signup-title">Signup</div>
                    <div className= "signup-inputs">
                        <input className= "signup-input-text" onChange={getFirstName} type="text" placeholder='First Name'/>
                        <input className= "signup-input-text" onChange={getLastName} type="text" placeholder="Last Name"/>
                        {/* <input className= "signup-input-text" onChange={getEmail} type="text" placeholder='Email'/> */}
                        <input className= "signup-input-text" onChange={getUsername} type="text" placeholder="Username"/>
                        <input className= "signup-input-text" onChange={getPassword} type={ShowPassword ? "text" : "password"} placeholder='Password'/>
                    </div>
                    <div className="signup-error-message">{ShowError ? Error.toString() : ""}</div>
                    <div className="show-pass-button-div"><button className = "show-pass-button" onClick={() => toggleShowPassword()}>{ShowPassword ? "Hide Password" : "Show Password"}</button></div>
                    <div className="signup-button-div"><Button className="signup-button" text="Signup" onClick={() => OnSignup()}></Button></div>
                </div>
            </div>
        );
}


export default Signup;