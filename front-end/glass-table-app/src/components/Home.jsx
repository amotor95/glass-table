import React, { useEffect } from 'react'
import './Home.css'
import HomeCard from './HomeCard.jsx'
import axios from 'axios'
import { useState } from 'react'

export function Home() {
    const [Stocks, setHomeStocks] = useState()
    
    function getHomeStocks() {
        axios.get('http://localhost:8000/get_home_watchlist')
        .then(response => {
            console.log("Home Watchlist sucessfully retrieved!");
            console.log(response.data);
            setHomeStocks(response.data)
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
                            <HomeCard className="home-card" cardName={stock.company} cardPrice={stock.price}></HomeCard>
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
                            <HomeCard className="home-card" cardName={stock.company} cardPrice={stock.price}></HomeCard>
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
                            <HomeCard cardName={stock.company} cardPrice={stock.price}></HomeCard>
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
                            <HomeCard cardName={stock.company} cardPrice={stock.price}></HomeCard>
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
