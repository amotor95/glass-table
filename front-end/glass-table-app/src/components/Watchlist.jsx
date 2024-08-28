import React from 'react';
import './Watchlist.css';
import axios from 'axios';
import Card from './Card.jsx'
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';




function Watchlist() {
    const {User, setUser} = useContext(UserContext);
    const [Watchlists, setWatchlists] = useState(null);
    const [WatchlistStocks, setWatchlistStocks] = useState(null);
    const [CurrentWatchlist, setCurrentWatchlist] = useState("Default");


    function getWatchlists() {
        axios.get('http://localhost:8000/get_watchlists', {
            headers: {
                Authorization: 'Token ' + User.token
            }
        })
        .then(response => {
            console.log("Watchlists sucessfully retrieved!");
            setWatchlists(response.data);
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });
    }

    function showWatchlists() {
        getWatchlists();

        document.getElementById("myDropdown").classList.toggle("show");
    }

    function GenerateWatchlistLinks() {
        console.log("Generating watchlist dropdown!")
        console.log(Watchlists)
        console.log("Is Watchlists an Array?: " + Array.isArray(Watchlists))
        if(Array.isArray(Watchlists)) {
            return(
                Watchlists.map((watchlist) => {
                    return(<a href="#" onClick={() => {console.log("Set current watchlist to: " + watchlist.name); setCurrentWatchlist(watchlist.name)}}>{watchlist.name}</a>)
                })
            )
        } else {
            return(<div>No watchlists available</div>)
        }
    }

    function GenerateWatchlistCards() {
        console.log("Generating watchlist cards!")
        axios.get('http://localhost:8000/fetch_watchlist_stocks', {
            headers: {
                Authorization: 'Token ' + User.token
            },
            body: {
                company: CurrentWatchlist
            }
        })
        .then(response => {
            console.log("Watchlist stocks sucessfully retrieved!");
            setWatchlistStocks(response.data);
        }).catch(error => {
            console.log(error + ", failed to get watchlist stocks!");
        });

        if(Array.isArray(WatchlistStocks)) {
            return(
                WatchlistStocks.map((stock) => {
                    return(<Card name={stock.company} price={stock.price}></Card>)
                })
            )
        } else {
            return(<div>No stocks available</div>)
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
                    <button onClick={() => showWatchlists()} className="dropbtn">Dropdown</button>
                    <div id="myDropdown" className="dropdown-content">
                        <input type="text" placeholder="Search..." id="myInput" onKeyUp={filterFunction} />
                        <GenerateWatchlistLinks></GenerateWatchlistLinks>
                    </div>
                </div>
            </div>
            <div className='watchlist-box'>
                <GenerateWatchlistCards></GenerateWatchlistCards>
            </div>
        </div>
    )
}

export default Watchlist;