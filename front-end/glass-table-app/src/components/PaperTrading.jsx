import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { FuncContext } from '../context/FuncContext.jsx';
import PaperCard from './PaperCard.jsx';
import axios from 'axios';
import './PaperTrading.css';

export function PaperTrading() {
    const [Stocks, setStocks] = useState([]);
    const [CurrentStock, setCurrentStock] = useState("No Stock Selected");
    const [CurrentStockPrice, setCurrentStockPrice] = useState("N/A");
    const [Cash, setCash] = useState(0);
    const {User, setUser} = useContext(UserContext);
    const [AccountValue, setAccountValue] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [ShowLeaderboard, setShowLeaderboard] = useState(false);
    const [JoinLeaderboard, setJoinLeaderboard] = useState();
    const [Leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        getStocks();
        getCash();
        get_account_value();
        getJoinLeaderboard();
        getLeaderboard();
    }, [])

    useEffect(() => {
        getJoinLeaderboard();
        getLeaderboard();
    }, [JoinLeaderboard, ShowLeaderboard])

    useEffect(() => {
        getCash();
        get_account_value();
        getLeaderboard();
    }, [Stocks])

    function getStocks() {
        axios.get('https://glass-table-production.up.railway.app/get_all_stocks',
        {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("All stocks sucessfully retrieved!");
            console.log(response.data);
            setStocks(response.data);
        }).catch(error => {
            console.log(error + ", failed to get stocks!");
        });
    }

    function buyStock() {
        axios.post('https://glass-table-production.up.railway.app/buy_stock',
        {
            ticker: CurrentStock,
            price: CurrentStockPrice,
            quantity: Quantity,
        },
        {
            headers: {
                Authorization: 'Token ' + User.token,
            }
        }).then(response => {
            console.log("Stock sucessfully bought!");
            console.log(response.data);
            getStocks();
        }).catch(error => {
            console.log(error + ", failed to buy stock!");
        });
    }

    function sellStock() {
        axios.post('https://glass-table-production.up.railway.app/sell_stock',
        {
            ticker: CurrentStock,
            price: CurrentStockPrice,
            quantity: Quantity,
        },
        {
            headers: {
                Authorization: 'Token ' + User.token,
            }
        }).then(response => {
            console.log("Stock sucessfully sold!");
            console.log(response.data);
            getStocks();
        }).catch(error => {
            console.log(error + ", failed to sell stock!");
        });
    }

    function getCash() {
        axios.get('https://glass-table-production.up.railway.app/get_cash', 
        {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("Cash balance sucessfully retrieved!");
            console.log(response.data.cash);
            setCash(response.data.cash);
            return response.data.cash;
        }).catch(error => {
            console.log(error + ", failed to get cash balance!");
        });
    }

    function get_account_value() {
        axios.get('https://glass-table-production.up.railway.app/get_account_value', 
        {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("Account value sucessfully retrieved!");
            console.log(response.data.account_value);
            setAccountValue(response.data.account_value);
            return response.data.account_value;
        }).catch(error => {
            console.log(error + ", failed to get account value!");
        });
    }

    async function getStockInfo(ticker) {
        try {
            const response = await axios.get('https://glass-table-production.up.railway.app/get_stock_info', 
            {
                headers: {
                    Authorization: 'Token ' + User.token,
                },
                params: {
                    ticker: ticker,
                },
            });
            console.log("Stock info of ", ticker, " sucessfully retrieved!");
            console.log(response.data);
            console.log("Current Price: ", response.data.current_price);
            return response.data;
        } catch (error) {
            console.log(error + ", failed to get stock info!");
            return null;
        }
    }

    async function getStockInput(event) {
        var stock_info = await getStockInfo(event.target.value);
        console.log("STOCK INFO: ", stock_info);
        if (stock_info != null && stock_info.current_price !== "N/A" 
            && stock_info.current_price !== undefined && stock_info.current_price !== "") {
            console.log("SETTING STOCK STUFF!!!");
            setCurrentStock(stock_info.ticker.toUpperCase());
            setCurrentStockPrice(stock_info.current_price);
        } else {
            console.log("Hitting else");
        }
    }

    function getLeaderboard() {
        axios.get('https://glass-table-production.up.railway.app/get_leaderboard', 
        {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("Leaderboard sucessfully retrieved!");
            console.log(response.data);
            setLeaderboard(response.data);
            return response.data;
        }).catch(error => {
            console.log(error + ", failed to get leaderboard!");
            return null;
        });
    }

    //Funtional components shouldn't be async
    function fetchLeaderboard() {
        if(!ShowLeaderboard) {
            console.log("Leaderboard not shown!");
            return;
        } else {
            console.log("Leaderboard shown!");
        }
        console.log("Fetching leaderboard");
        console.log("Leaderboard: ", Leaderboard);
        console.log("Leaderboard type: ", typeof Leaderboard);
        return (

            <div className='leaderboard-box'>
            { Array.isArray(Leaderboard) ? (
                Leaderboard.map((competitor, index) => (
                    <p>{competitor.account_name}: {formatter.format(competitor.account_value)}</p>
                ))
            ) :
                <div>Leaderboard failed to load!</div> 
            }
            </div>
        )
    }

    function getJoinLeaderboard() {
        axios.get('https://glass-table-production.up.railway.app/get_join_leaderboard', 
        {
            headers: {
                Authorization: 'Token ' + User.token,
            },
        })
        .then(response => {
            console.log("Join leaderboard status sucessfully retrieved!");
            console.log(response.data);
            setJoinLeaderboard(response.data)
            return response.data;
        }).catch(error => {
            console.log(error + ", failed to get join leaderboard status!");
            return null;
        });
    }

    function toggleJoinLeaderboard() {
        axios.post('https://glass-table-production.up.railway.app/toggle_join_leaderboard', {},
            {
                headers: {
                    Authorization: 'Token ' + User.token,
                },
            }).then(response => {
                console.log("Join leaderboard sucessfully toggled!");
                getJoinLeaderboard();
            }).catch(error => {
                console.log(error + ", failed to toggle join leaderboard!");
            });
    }

    function getQuantityInput(event) {
        setQuantity(event.target.value);
    }

    function showLeaderboard() {
        console.log("ShowLeaderboard: " + ShowLeaderboard);
        ShowLeaderboard ? setShowLeaderboard(false) : setShowLeaderboard(true);
    }
    
    // Create a number formatter for USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="paperbox">
            <div className="trading">
                <div className="trading-topbar">
                    <div className="account-info">
                            <div>Account Value: <br></br> {formatter.format(AccountValue)}</div>
                            <div>Cash: <br></br> {formatter.format(Cash)}</div>
                    </div>
                    <div className="terminal">
                        <input type="text" onChange={getStockInput} className="ticker-input" placeholder="Enter a stock ticker"></input>
                        <div>Current Stock: {CurrentStock}</div>
                        <div>Price: {isNaN(CurrentStockPrice) ? "" : formatter.format(CurrentStockPrice)}</div>
                        <div className="buying-div">
                            <input type="text" onChange={getQuantityInput} className="quantity-input" placeholder="Enter a quantity"></input>
                            <button onClick={() => buyStock(CurrentStock)}>BUY</button>
                            <button onClick={() => sellStock(CurrentStock)}>SELL</button>
                        </div>
                        
                    </div>
                </div>
                <div className='stock-box'>
                { Array.isArray(Stocks) ? (
                    Stocks.map((stock, index) => (
                        <PaperCard className="paper-card" quantity={stock.quantity} cardTicker={stock.ticker} cardName={stock.company_name} cardPrice={stock.current_price} buy_price={stock.buy_price}></PaperCard>
                    ))
                ) :
                    <div>Cards didn't load!</div> 
                }
                </div>
            </div>
            <div className="leaderboard">
                <button className="show-leaderboard-btn" onClick={showLeaderboard}>Show Leaderboard </button>
                <button className="setjoin-leaderboard-btn" onClick={() => toggleJoinLeaderboard()}>{JoinLeaderboard ? "Leave Leaderboard" : "Join Leaderboard"} </button>
                {fetchLeaderboard()}
            </div>
        </div>
    );
};

export default PaperTrading;