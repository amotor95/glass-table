import React, { useEffect } from 'react';
import './Watchlist.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';




function Watchlist() {
    const {User, setUser} = useContext(UserContext);
    const [Watchlists, setWatchlists] = useState([]);

    function getWatchlists() {
        axios.get('http://localhost:8000/get_watchlists', {
            headers: {
                Authorization: 'Token ' + User.token
            }
        })
        .then(response => {
            console.log("Watchlists sucessfully retrieved!");
            console.log(response.data);
            setWatchlists(response.data);

            return response.data;
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });
    }


    useEffect(() => {
        getWatchlists();
    }, [])

    const showWatchlists = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function GenerateWatchlistLinks() {
        if(Array.isArray(Watchlists)) {
            Watchlists.map((watchlist) => {
                return(
                    <a>{watchlist.name}</a>
                )
            })
        } else {
            return(
                <div>Watchlists didn't load!</div>
            )
        }
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
                    <button onClick={showWatchlists} className="dropbtn">Dropdown</button>
                    <div id="myDropdown" className="dropdown-content">
                        <input type="text" placeholder="Search..." id="myInput" onKeyUp={filterFunction}/>
                        { Array.isArray(Watchlists) ? (
                            Watchlists.map((watchlist, index) => (
                                <a key={index}>{watchlist.name}</a>  // Render each watchlist link
                            ))
                        ) :
                            <div>Watchlists didn't load!</div>  // If watchlists are not loaded or empty
                        }
                    </div>
                </div>
            </div>
            <div className='watchlist-box'>
                
            </div>
        </div>
    )
}

export default Watchlist;