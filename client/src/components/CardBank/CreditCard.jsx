import React, { useState } from 'react';
import Tap from '../../assets/img/tap.png'
import './CreditCard.css'; // We'll define the CSS in a separate file

const CreditCard = ({bank,branch,cardType,cNumber,owner,expiryDate,cnn}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // Toggle between front and back of the card
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of the Card */}
        <div className="card-front">
          <div className="bank-name">{bank}</div>
          <div className="chip-and-contactless">
            <div className="chip"></div>
            <div className="w-9 h-9 "><img src={Tap}/></div>
          </div>
          <div className="card-number">
           {cNumber}
          </div>
          <div className="card-details">
            <div className="cardholder">
              <span>{owner}</span>
              <span className='text-lg'>{cardType} Card</span>
            </div>
            <div className="expiry">
              <span>{expiryDate}</span>
              <span className='text-lg'>{branch}</span>
            </div>
          </div>
        </div>

        {/* Back of the Card */}
        <div className="card-back">
          <div className="magnetic-strip"></div>
          <div className="signature-strip">
            <span>{owner}</span>
            <div className="cvv">{cnn}</div>
          </div>
          <div className="card-back-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;