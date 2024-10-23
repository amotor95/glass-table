import './App.css';
import Card from './components/WatchlistCard.jsx'
import Login from './components/Login.jsx'
import { LoggedInSidebar, LoggedOutSidebar, SideBar } from './components/Sidebar.jsx';
import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import Button from './components/button.jsx';
import { UserContext } from './context/UserContext.jsx';
import { FuncContext } from './context/FuncContext.jsx';
import FuncBox from './components/FuncBox.jsx';

function App() {
    const user = {
      // email: "",
      id: "-1",
      password: "",
      username: "",
      loggedin: false,
      token: "",
    }
    const [User, setUser] = useState(user)
    const [CurrentScreen, setCurrentScreen] = useState("Home")
    document.title = "Glass Table";
    return (
      <div className="main-page">

        <div className="topbar">
          <div className="topbar-title">Glass Table</div>
        </div>

        <div className= "main-box-div">

          
          <UserContext.Provider value={{User, setUser}}>
          <FuncContext.Provider value={{CurrentScreen, setCurrentScreen}}>
            <div className="login-sidebar">
              <SideBar></SideBar>
            </div>
              <div className="functional-box">
                <FuncBox></FuncBox>
              </div>
          </FuncContext.Provider>
          </UserContext.Provider>

        </div>

      </div>
    )

}

export default App;