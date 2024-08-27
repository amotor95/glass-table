import React from 'react';
import './Watchlist.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';



function Watchlist() {
    const myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
        console.log("hit buttom");
    }
    function filterFunction() {
        var input, filter, div, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");

        for (i = 0; i < a.length; i++) {
            var txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = ""; // Show the item
            } else {
                a[i].style.display = "none"; // Hide the item
            }
        }
    }
    
    return(
        <div className='watchlist-screen'>
            <div className='watchlist-topbar'>
                <div className="dropdown">
                    <button onClick={myFunction} className="dropbtn">Dropdown</button>
                    <div id="myDropdown" className="dropdown-content">
                        <input type="text" placeholder="Search.." id="myInput" onKeyUp={filterFunction} />
                        <a href="#about">About</a>
                        <a href="#base">Base</a>
                        <a href="#blog">Blog</a>
                        <a href="#contact">Contact</a>
                        <a href="#custom">Custom</a>
                        <a href="#support">Support</a>
                        <a href="#tools">Tools</a>
                    </div>
                </div>
            </div>
            <div className='watchlist-box'>
                
            </div>
        </div>
    )
}

export default Watchlist