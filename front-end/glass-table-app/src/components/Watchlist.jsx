import React from 'react';
import './Watchlist.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';




function Watchlist() {
    const {User, setUser} = useContext(UserContext);
    const {Watchlists, setWatchlists} = useState([]);

    const getWatchlists = () => {
        axios.get('http://localhost:8000/get_watchlists', {
            headers: {
                Authorization: 'Token ' + User.token
            }
        })
        .then(response => {
            console.log("Watchlists sucessfully retrieved!");
            console.log(response.data);
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });

        document.getElementById("myDropdown").classList.toggle("show");
    }

    // function generateWatchlistButtons() {
    //     return(
    //         <div></div>
    //     )
    // }



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
                    <button onClick={getWatchlists} className="dropbtn">Dropdown</button>
                    <div id="myDropdown" className="dropdown-content">
                        <input type="text" placeholder="Search..." id="myInput" onKeyUp={filterFunction} />
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