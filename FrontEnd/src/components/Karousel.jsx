import { useState, useEffect } from "react";
import "../styles/karousel.css"
const Karousel = ({ offers }) => {
  // Get the last 5 offers
  const lastFiveOffers = offers ? offers.slice(-5) : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll timer
  useEffect(() => {
    if (lastFiveOffers.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === lastFiveOffers.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [lastFiveOffers.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  if (!offers || offers.length === 0) {
    return (
      <div className="carousel-container">
        <div className="no-offers">No offers available</div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div 
          className="carousel-track"
         style={{
  transform: `translateX(-${currentIndex * (100 / lastFiveOffers.length)}%)`,
  width: `${lastFiveOffers.length * 100}%`,
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
}}
        >
          {lastFiveOffers.map((offer, index) => (
            <div key={index} className="carousel-slide"
             style={{  minWidth: `${100 / lastFiveOffers.length }%`}}>
              <div className="offer-card">
                <h3 className="offer-title">{offer.product || "Job Opportunity"}</h3>
                <div className="offer-pitch">
                  <p>{offer.pitch || "Join our dynamic team and make a real impact in a fast-growing company with excellent benefits and growth opportunities."}</p>
                </div>
                <div className="offer-details">
                  
                    
                <div className="detail-item">
                    <p className="detail-label"><img src="/commission.svg" alt="commission" /></p>
                    <p className="detail-value">${offer.commission || "TBD"}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label"><img src="/home_work.svg" alt="work mode"></img></p>
                    <p className="detail-value">{offer.workMode || "Remote"}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label"><img src="/range.svg" alt="range"></img></p>
                    <p className="detail-value">{offer.range || "$50k - $80k"}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label"><img src="/person.svg" alt="person"></img></p>
                    <p className="detail-value">{offer.client || "Confidential"}</p>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-dots">
        {lastFiveOffers.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Karousel;
