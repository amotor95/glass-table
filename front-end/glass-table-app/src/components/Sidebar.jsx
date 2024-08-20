import React from 'react';
import './Sidebar.css';
import Button from '../components/button.jsx';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';



export function LoggedOutSidebar() {
    const {CurrentScreen, setCurrentScreen} = useContext(FuncContext);
    return(
        <div className="login-sidebar">
            <Button className= "sidebar-button" onClick={()=>{setCurrentScreen("Login")}} text="Login"></Button>
            <Button className= "sidebar-button" text="Sign Up"></Button>
        </div>
    );
}

export function LoggedInSidebar() {
    const {LoggedIn, setLoggedIn} = useContext(UserContext)
    const {CurrentScreen, setCurrentScreen} = useContext(FuncContext);
    function LogOut() {
        setLoggedIn(false);
        setCurrentScreen("Home")
        console.log("Logged out!")
    }
    return(
        <div className="login-sidebar">
            <div>Welcome user</div>
            <Button className= "sidebar-button" onClick={()=>LogOut()} text="Logout"></Button>
        </div>
    );
}

export function SideBar() {
    const {LoggedIn, setLoggedIn} = useContext(UserContext)
    if(LoggedIn) {
        return(LoggedInSidebar());
    } else {
        return(LoggedOutSidebar());
    }
}

export default SideBar;
