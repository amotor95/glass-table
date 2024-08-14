import React from 'react';
import './Card.css';



function Card({imgSrc}) {

    return(
        <div className='card-container'>
            <img className="card-img" src = {imgSrc} alt = "placeholder img"></img>
            <h2 className="card-title">NVIDIA</h2>
            <p className="card-description">Price: $420</p>
        </div>
    );
}

export default Card
