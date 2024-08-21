import React from 'react';
import './Home.css'
import Card from './Card.jsx'

export function Home() {
    return(
        <div className="home-screen">
            <div className="row-container">
                <div className="row">
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                </div>
                <div className="row" aria-hidden="true">
                <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                </div>
            </div>
            <div className="row-container">
                <div className="row">
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                </div>
                <div className="row" aria-hidden="true">
                <Card className="item"></Card>
                    <Card className="item">vvv</Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                    <Card className="item"></Card>
                </div>
            </div>
        </div>


        
    )
}

export default Home;
