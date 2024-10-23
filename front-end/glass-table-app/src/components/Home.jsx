import React, { useEffect } from 'react'
import './Home.css'
import HomeCard from './HomeCard.jsx'
import axios from 'axios'
import { useState } from 'react'

export function Home() {
    const [Stocks, setHomeStocks] = useState([])
    
    function getHomeStocks() {
        axios.get('https://glass-table-production.up.railway.app/get_home_watchlist')
        .then(response => {
            console.log("Home Watchlist sucessfully retrieved!");
            console.log(Object.values(response.data));
            setHomeStocks(Object.values(response.data)); // Convert the object to an array
        }).catch(error => {
            console.log(error + ", failed to get watchlists!");
        });
    }

    useEffect(() => {
        getHomeStocks()
    }, [])

    return(
        <div className="home-screen">
            <div className="row-container">

                <div className="row">
                    {/* <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card> */}
                    { Array.isArray(Stocks) ? (
                        Stocks.map((stock, index) => (
                            <HomeCard className="home-card" cardTicker={stock.ticker} cardName={stock.company_name} cardPrice={stock.current_price}></HomeCard>
                        ))
                        ) :
                            <div>Cards didn't load!</div> 
                    }
                </div>
                <div className="row" aria-hidden="true">
                    {/* <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card> */}
                    { Array.isArray(Stocks) ? (
                        Stocks.map((stock, index) => (
                            <HomeCard className="home-card" cardTicker={stock.ticker} cardName={stock.company_name} cardPrice={stock.current_price}></HomeCard>
                        ))
                        ) :
                            <div>Cards didn't load!</div> 
                    }
                </div>
            </div>
            <div className="row-container">
                <div className="row">
                    {/* <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card> */}
                    { Array.isArray(Stocks) ? (
                        Stocks.map((stock, index) => (
                            <HomeCard cardTicker={stock.ticker} cardName={stock.company_name} cardPrice={stock.current_price}></HomeCard>
                        ))
                        ) :
                            <div>Cards didn't load!</div> 
                    }
                </div>
                <div className="row" aria-hidden="true">
                    {/* <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card> */}
                    { Array.isArray(Stocks) ? (
                        Stocks.map((stock, index) => (
                            <HomeCard cardTicker={stock.ticker} cardName={stock.company_name} cardPrice={stock.current_price}></HomeCard>
                        ))
                        ) :
                            <div>Cards didn't load!</div> 
                    }
                </div>
            </div>
        </div>


        
    )
}

export default Home;
