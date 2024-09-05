import React from 'react';
import './WatchlistCard.css';



function WatchlistCard({imgSrc, cardName, cardPrice}) {

    return(
        <div className='watchlist-card-container'>
            <img className="watchlist-card-img" src = {imgSrc} alt = "placeholder img"></img>
            <h2 className="watchlist-card-title">{cardName}</h2>
            <p className="watchlist-card-description">Price: {cardPrice}</p>
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