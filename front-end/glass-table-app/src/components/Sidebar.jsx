import React from 'react';
import './Sidebar.css';
import Button from '../components/button.jsx';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';
import axios from 'axios';


export function LoggedOutSidebar() {
    const {CurrentScreen, setCurrentScreen} = useContext(FuncContext);
    return(
        <div className="login-sidebar">
            <Button className= "sidebar-button" onClick={()=>{setCurrentScreen("Login")}} text="Login"></Button>
            <Button className= "sidebar-button" onClick={() => {setCurrentScreen("Signup")}}text="Sign Up"></Button>
        </div>
    );
}

export function LoggedInSidebar() {
    const {User, setUser} = useContext(UserContext)
    const {CurrentScreen, setCurrentScreen} = useContext(FuncContext);
    function LogOut() {
        axios.post('http://localhost:8000/logout', {}, {
        headers: {
            Authorization: 'Token ' + User.token,
        }}).then(response => {
            const user = {
                email: "",
                id: "-1",
                password: "",
                username: "",
                loggedin: false,
                token: "",
              }
            setCurrentScreen("Home")
            console.log("Logged out!")
            console.log(User.username + " requested logout from server!");
            setUser(user);
        }).catch(error => {
            console.log("Logout with server failed!");
        });
    }
    return(
        <div className="login-sidebar">
            <div className="welcome-div">Welcome {User.username}!</div>
            <Button className= "sidebar-button" onClick={()=>setCurrentScreen("Watchlist")} text="Watchlist"></Button>
            <Button className= "sidebar-button" onClick={()=>setCurrentScreen("PaperTrading")} text="Paper Trading"></Button>
            <Button className= "sidebar-button" onClick={()=>LogOut()} text="Logout"></Button>
        </div>
    );
}

export function SideBar() {
    const {User, setUser} = useContext(UserContext)
    if(User.loggedin) {
        return(<LoggedInSidebar/>);
    } else {
        return(<LoggedOutSidebar/>);
    }
}

export default SideBar;
