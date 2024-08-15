import React from 'react';
import './Card.css';



function Card({imgSrc, cardName, cardPrice}) {

    return(
        <div className='card-container'>
            <img className="card-img" src = {imgSrc} alt = "placeholder img"></img>
            <h2 className="card-title">{cardName}</h2>
            <p className="card-description">Price: {cardPrice}</p>
        </div>
    );
}

export default Card
