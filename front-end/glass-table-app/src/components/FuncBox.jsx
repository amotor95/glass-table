import React from 'react';
import Login from './Login.jsx';
import Home from './Home.jsx';
import { useContext, useState } from 'react';
import { FuncContext } from '../context/FuncContext.jsx';

export function FuncBox() {
    const {CurrentScreen, setCurrentScreen} = useContext(FuncContext);
    if(CurrentScreen === "Home") {
        return(
            Home()
        )
    } else if(CurrentScreen === "Login") {
        return(
            Login()
        )
    } else {
        return (
            <div style="color: red; font-size: 100px;">ERROR!!!!! NO SCREEN CHOSEN FOR FUNC BOX</div>
        )
    }
}

export default FuncBox