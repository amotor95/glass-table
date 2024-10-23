import React from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import Watchlist from './Watchlist.jsx';
import PaperTrading from './PaperTrading.jsx';
import './FuncBox.css';
import { useContext, useState } from 'react';
import { FuncContext } from '../context/FuncContext.jsx';

export function FuncBox() {
    const {CurrentScreen, setCurrentScreen} = useContext(FuncContext);
    if(CurrentScreen === "Home") {
        return(
            <Home/>
        )
    } else if(CurrentScreen === "Login") {
        return(
            <Login/>
        )
    } else if(CurrentScreen === "Signup") {
        return(
            <Signup/>
        )
    } else if(CurrentScreen === "Watchlist") {
        return(
            <Watchlist/>
        )
    } else if(CurrentScreen === "PaperTrading") {
        return(
            <PaperTrading/>
        )
    } else {
        return (
            <div style="color: red; font-size: 100px;">ERROR!!!!! NO SCREEN CHOSEN FOR FUNC BOX</div>
        )
    }
}

export default FuncBox