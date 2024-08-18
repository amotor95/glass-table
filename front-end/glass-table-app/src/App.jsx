import './App.css';
import Card from './components/Card.jsx'
import Login from './components/Login.jsx'
import { LoggedInSidebar, LoggedOutSidebar } from './components/Sidebar.jsx';
import React, { useState } from 'react';
import axios from 'axios';
import Button from './components/button.jsx';

class App extends React.Component {


  render() {
    return (
      <div className="main-page">

        <div className="topbar">
          <div className="topbar-title">Glass Table</div>
        </div>

        <div className= "main-box-div">

          <div className="login-sidebar">
            <LoggedOutSidebar></LoggedOutSidebar>
          </div>

          <div className="functional-box">
            <Login></Login>
          </div>

        </div>

      </div>
    )
  }

}

export default App;