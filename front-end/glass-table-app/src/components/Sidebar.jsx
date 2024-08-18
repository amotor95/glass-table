import React from 'react';
import './Sidebar.css';
import Button from '../components/button.jsx';



export function LoggedOutSidebar() {

    return(
        <div className="login-sidebar">
            <Button className= "sidebar-button" text="Login"></Button>
            <Button className= "sidebar-button" text="Sign Up"></Button>
        </div>
    );
}

export function LoggedInSidebar() {
    return(
        <div className="login-sidebar">
            <Button className= "sidebar-button" text="Logout"></Button>
        </div>
    );
}

export default LoggedOutSidebar;
