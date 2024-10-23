import React from 'react';
import './PaperCard.css';

// Create a number formatter for USD
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function PaperCard({imgSrc, cardName, cardPrice, cardTicker, buy_price, quantity}) {
    const color_function = () => ({
        color: (cardPrice - buy_price) >= 0 ? 'green' : 'red',
    })

    return(
        <div className='watchlist-card-container'>
            <img className="watchlist-card-img" src = {imgSrc} alt = "placeholder img"></img>
            <h1 className="watchlist-ticker">{cardTicker}</h1>
            <h2 className="watchlist-card-title">{cardName}</h2>
            <p className="watchlist-card-description">Current Price: {formatter.format(cardPrice)}</p>
            <p className="watchlist-buy-price">Buy Price: {formatter.format(buy_price)}</p>
            <p className="watchlist-shares">Quantity: {quantity}</p>
            <p className="watchlist-value">Total Value: {formatter.format(cardPrice*quantity)}</p>
            <p style={color_function()} className="watchlist-gain">Profit: {formatter.format((cardPrice - buy_price) * quantity)}</p>
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

export default PaperCard