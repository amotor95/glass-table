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
    const [AllStocks, setAllStocks] = useState([])

    useEffect(() => {
        getWatchlists();
        getAllStocks();
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



    function getAllStocks() {
        axios.get('http://localhost:8000/get_all_stocks', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("All stocks sucessfully retrieved!");
            console.log(response.data);
            setAllStocks(response.data);
        }).catch(error => {
            console.log(error + ", failed to get all stocks!");
        });
    }

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
        document.getElementById("watchlist-myDropdown").classList.toggle("show");
    }

    const showAllStocks = () => {
        document.getElementById("stocks-myDropdown").classList.toggle("show");
    }

    function deleteWatchlist() {
        axios.post('http://localhost:8000/delete_watchlist', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
            data: {
                name: CurrentWatchlist,
            },
        })
        .then(response => {
            console.log(CurrentWatchlist + " sucessfully deleted!");
            getWatchlists()
            setCurrentWatchlist(DefaultWatchlist)
        }).catch(error => {
            console.log(error + ", failed to delete watchlist!");
        });
    }

    function add_stock({stock_to_add}) {
        axios.post('http://localhost:8000/add_stock_to_watchlist', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
            data: {
                stock_name: stock_to_add,
                watchlist_name: CurrentWatchlist,
            },
        })
        .then(response => {
            console.log(stock_to_add + " sucessfully added to " + CurrentWatchlist + "!");
            setCurrentWatchlist(CurrentWatchlist)
        }).catch(error => {
            console.log(error + ", failed to add stock to watchlist!");
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

    function makeWatchlist() {
        const input = document.getElementById("watchlist-myInput");
        const create_name = input.value.toUpperCase();

        axios.post('http://localhost:8000/make_watchlist', {
            headers: {
                Authorization: 'Token ' + User.token,
            },
            data: {
                name: create_name,
            },
        })
        .then(response => {
            console.log(create_name + " watchlist successfully created!");
            getWatchlists()
            setCurrentWatchlist(create_name)
        }).catch(error => {
            console.log(error + ", failed to create watchlist!");
        });

    }

    function stocksFilterFunction() {
        var input, filter, div, a, i;
        input = document.getElementById("stocks-myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("stocks-myDropdown");
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
                <div className="watchlist-dropdown">
                    <button onClick={showWatchlists} className="watchlist-dropbtn">Watchlists</button>
                    <div id="watchlist-myDropdown" className="watchlist-dropdown-content">
                        <input type="text" placeholder="Search..." id="watchlist-myInput" onKeyUp={watchlistFilterFunction}/>
                        { Array.isArray(Watchlists) ? (
                            Watchlists.map((watchlist, index) => (
                                <a className="watchlist-link" key={index} onClick={() => {showWatchlists(); setCurrentWatchlist(watchlist.name); getWatchlistStocks()}}>{watchlist.name}</a>  // Render each watchlist link
                            ))
                        ) :
                            <div>Watchlists didn't load!</div>  // If watchlists are not loaded or empty
                        }
                        <a className="watchlist-link" id="create-watchlist" onClick={()=> makeWatchlist()}>+ Create Watchlist</a>
                    </div>
                </div>
                <div className="stocks-dropdown">
                    <button onClick={showAllStocks} className="stocks-dropbtn">Stocks</button>
                    <div id="stocks-myDropdown" className="stocks-dropdown-content">
                        <input type="text" placeholder="Search..." id="stocks-myInput" onKeyUp={stocksFilterFunction}/>
                        { Array.isArray(AllStocks) ? (
                            console.log("Current AllStocks list: " + AllStocks),
                            AllStocks.map((stock, index) => (
                                <a className="stocks-link" key={index} onClick={() => {showAllStocks(); add_stock(stock.company);getWatchlistStocks()}}>{stock.name}</a>  // Render each watchlist link
                            ))
                        ) :
                            <div>Stocks didn't load!</div>  // If watchlists are not loaded or empty
                        }
                    </div>
                </div>
                {CurrentWatchlist === DefaultWatchlist ? "" : <button className="watchlist-delete-button" onClick={()=>deleteWatchlist()}>Delete Watchlist</button> }
            </div>
            <div className='watchlist-box'>
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