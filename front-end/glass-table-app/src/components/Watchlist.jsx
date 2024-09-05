import React, { useEffect } from 'react';
import './Watchlist.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';
import WatchlistCard from './WatchlistCard.jsx';




function Watchlist() {
    const {User, setUser} = useContext(UserContext);
    const [Stocks, setStocks] = useState([]);
    const [Watchlists, setWatchlists] = useState([]);
    const [DefaultWatchlist, setDefaultWatchlist] = useState("Default");
    const [CurrentWatchlist, setCurrentWatchlist] = useState()

    useEffect(() => {
        getWatchlists();
    }, [])

    useEffect(() => {
        if (DefaultWatchlist) {
            setCurrentWatchlist(DefaultWatchlist);
            getWatchlistStocks();
        }
    }, [DefaultWatchlist])

    useEffect(() => {
        if (CurrentWatchlist) {
            getWatchlistStocks();
        }
    }, [CurrentWatchlist])

    function getWatchlists() {
        axios.get('http://localhost:8000/get_watchlists', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
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

    function getWatchlistStocks() {
        axios.get('http://localhost:8000/fetch_watchlist_stocks', {
            headers: {
                Authorization: 'Token ' + User.token,
            },

            params: {
                name: CurrentWatchlist,
            },
        })
        .then(response => {
            console.log(CurrentWatchlist + " stocks sucessfully retrieved!");
            console.log(response.data);
            setStocks(response.data);

            return response.data;
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });
    }

    function getDefaultWatchlist() {
        axios.get('http://localhost:8000/get_default_watchlist', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("Default watchlist sucessfully retrieved!");
            console.log(response.data);
            setDefaultWatchlist(response.data.default_watchlist.name);

            return response.data;
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });
    }


    const showWatchlists = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function deleteWatchlist({watchlist_to_delete}) {
        axios.post('http://localhost:8000/delete_watchlist', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
            data: {
                name: watchlist_to_delete,
            },
        })
        .then(response => {
            console.log(watchlist_to_delete + " sucessfully deleted!");
            setCurrentWatchlist(DefaultWatchlist)
        }).catch(error => {
            console.log(error + ", failed to delete watchlist!");
        });
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
                    <button onClick={showWatchlists} className="dropbtn">Watchlists</button>
                    <div id="myDropdown" className="dropdown-content">
                        <input type="text" placeholder="Search..." id="myInput" onKeyUp={filterFunction}/>
                        { Array.isArray(Watchlists) ? (
                            Watchlists.map((watchlist, index) => (
                                <a key={index} onClick={() => {setCurrentWatchlist(watchlist.name); getWatchlistStocks()}}>{watchlist.name}</a>  // Render each watchlist link
                            ))
                        ) :
                            <div>Watchlists didn't load!</div>  // If watchlists are not loaded or empty
                        }
                        <a>+ Create Watchlist</a>
                    </div>
                </div>
                {CurrentWatchlist === DefaultWatchlist ? "" : <button className="watchlist-delete-button" onClick={()=>deleteWatchlist()}>Delete Watchlist</button> }
                
            </div>
            <div className='watchlist-box'>
            {console.log("Current watchlist: " + CurrentWatchlist)}
            {console.log("Current stocks: " + Stocks)}
            { Array.isArray(Stocks) ? (
                Stocks.map((stock, index) => (
                    <WatchlistCard className="watchlist-card" cardName={stock.company} cardPrice={stock.price}></WatchlistCard>
                ))
            ) :
                <div>Cards didn't load!</div> 
            }
            </div>
        </div>
    )
}

export default Watchlist;