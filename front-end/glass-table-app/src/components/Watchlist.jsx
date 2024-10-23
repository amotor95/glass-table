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
    const [CurrentWatchlist, setCurrentWatchlist] = useState("Default")

    useEffect(() => {
        getWatchlists();
        getWatchlistStocks();
    }, [])

    useEffect(() => {
        console.log("Current Watchlist: " + CurrentWatchlist)
        getWatchlistStocks();
    }, [CurrentWatchlist])

    function getWatchlists() {
        axios.get('https://glass-table-production.up.railway.app/get_watchlists', {
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
        axios.get('https://glass-table-production.up.railway.app/fetch_watchlist_stocks', {
            headers: {
                Authorization: 'Token ' + User.token,
            },

            params: {
                name: CurrentWatchlist,
            },
        })
        .then(response => {
            console.log(CurrentWatchlist + " stocks sucessfully retrieved!");
            console.log(Object.values(response.data));
            setStocks(Object.values(response.data));
            return Object.values(response.data);
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });
    }


    const showWatchlists = () => {
        document.getElementById("watchlist-myDropdown").classList.toggle("show");
    }

    function deleteWatchlist() {
        axios.post('https://glass-table-production.up.railway.app/delete_watchlist',    
        {
            name: CurrentWatchlist,
        },
        {
            headers: {
                Authorization: 'Token ' + User.token,
            }
        })
        .then(response => {
            console.log(CurrentWatchlist + " sucessfully deleted!");
            getWatchlists()
            setCurrentWatchlist("Default")
        }).catch(error => {
            console.log(error + ", failed to delete watchlist!");
        });
    }

    function add_stock() {
        var stock_to_add = document.getElementById('stocks-myInput').value.toUpperCase();
        axios.post('https://glass-table-production.up.railway.app/add_stock_to_watchlist',         
        {
            stock_name: stock_to_add,
            watchlist_name: CurrentWatchlist,
        },
        {
            headers: {
                Authorization: 'Token ' + User.token,
            }
        })
        .then(response => {
            getWatchlistStocks();
            console.log(stock_to_add + " sucessfully added to " + CurrentWatchlist + "!");
        }).catch(error => {
            console.log(error + ", failed to add stock to watchlist!");
        });
    }

    function remove_stock(stock_to_remove) {
        axios.post('https://glass-table-production.up.railway.app/remove_stock_from_watchlist',    
        {
            stock_name: stock_to_remove,
            watchlist_name: CurrentWatchlist,
        },
        {
            headers: {
                Authorization: 'Token ' + User.token,
            }
        })
        .then(response => {
            console.log(stock_to_remove + " sucessfully removed from " + CurrentWatchlist + "!");
            getWatchlistStocks();
        }).catch(error => {
            console.log(error + ", failed to removed stock from watchlist!");
        });
    }

    function makeWatchlist() {
        const input = document.getElementById("watchlist-myInput");
        const create_name = input.value;

        axios.post('https://glass-table-production.up.railway.app/make_watchlist',
            {
                name: create_name,
            },
            {
                headers: {
                    Authorization: 'Token ' + User.token,
                }
            }
        )
        .then(response => {
            console.log(create_name + " watchlist successfully created!");
            setCurrentWatchlist(create_name);
            getWatchlists();
            console.log("Current/New Watchlist: " + CurrentWatchlist)
            console.log("Current/New Watchlist Stocks: " + Stocks)
        }).catch(error => {
            console.log(error + ", failed to create watchlist!");
        });
    }

    function watchlistFilterFunction() {
        var input, filter, div, a, i;
        input = document.getElementById("watchlist-myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("watchlist-myDropdown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            var txtValue = a[i].textContent || a[i].innerText;
            if (a[i].id === "create-watchlist") {
                a[i].style.display = ""; // Always show "Create Watchlist"
            } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = ""; // Show matching items
            } else {
                a[i].style.display = "none"; // Hide non-matching items
            }
        }
    }

    return(
        <div className='watchlist-screen'>
            <div className='watchlist-topbar'>
                <div className="watchlist-dropdown">
                    <button onClick={showWatchlists} className="watchlist-dropbtn">{CurrentWatchlist}</button>
                    <div id="watchlist-myDropdown" className="watchlist-dropdown-content">
                        <input type="text" placeholder="Search..." id="watchlist-myInput" onKeyUp={watchlistFilterFunction}/>
                        { Array.isArray(Watchlists) ? (
                            Watchlists.map((watchlist, index) => (
                                <a className="watchlist-link" key={index} onClick={() => {showWatchlists(); setCurrentWatchlist(watchlist.name)}}>{watchlist.name}</a>  // Render each watchlist link
                            ))
                        ) :
                            <div>Watchlists didn't load!</div>  // If watchlists are not loaded or empty
                        }
                        <a className="watchlist-link" id="create-watchlist" onClick={()=> makeWatchlist()}>+ Create Watchlist</a>
                    </div>
                </div>
                <div className="stocks-search">
                        <input type="text" placeholder="Add Ticker..." id="stocks-myInput"/>
                        <button onClick={() => {add_stock()}} className="stocks-addbtn">+</button>
                </div>{CurrentWatchlist === "Default" ? "" : <div className="delete-button-div"><button className="watchlist-delete-button" onClick={()=>deleteWatchlist()}>Delete Watchlist</button></div>}
            </div>
            <div className='watchlist-box'>
            { Array.isArray(Stocks) ? (
                Stocks.map((stock, index) => (
                    <WatchlistCard className="watchlist-card" remove_stock={remove_stock} cardTicker={stock.ticker} cardName={stock.company_name} cardPrice={stock.current_price}></WatchlistCard>
                ))
            ) :
                <div>Cards didn't load!</div> 
            }
            </div>
        </div>
    )
}

export default Watchlist;