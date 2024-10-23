import React from 'react';
import './WatchlistCard.css';

// Create a number formatter for USD
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function WatchlistCard({imgSrc, cardName, cardPrice, cardTicker, remove_stock}) {

    return(
        <div className='watchlist-card-container'>
            <img className="watchlist-card-img" src = {imgSrc} alt = "placeholder img"></img>
            <h1 className="watchlist-ticker">{cardTicker}</h1>
            <h2 className="watchlist-card-title">{cardName}</h2>
            <p className="watchlist-card-description">Price: {formatter.format(cardPrice)}</p>
            <button className="watchlist-card-deletebtn" onClick={()=>remove_stock(cardTicker)}>Delete</button>
        </div>
    );
}

// export default Card;

// export const Card = ({
//     imgSrc,
//     imgAlt,
//     title,
//     description,
//     buttonText,
//     link,
//   }) => {
//     return (
//       <div className="card-container">
//         {imgSrc && imgAlt && (
//           <img src={imgSrc} alt={imgAlt} className="card-img" />
//         )}
//         {title && <h1 className="card-title">{title}</h1>}
//         {description && <p className="card-description">{description}</p>}
//         {buttonText && link && (
//           <a href={link} className="card-btn">
//             {buttonText}
//           </a>
//         )}
//       </div>
//     );
//   };

export default WatchlistCard