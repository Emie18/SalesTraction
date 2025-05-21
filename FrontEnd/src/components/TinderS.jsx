import { useEffect, useState } from "react";
import "../styles/tinder.css";
import { getTinder } from "../scripts/getData";
import { initTinderCardsWithModal } from "../scripts/tinderS";

function TinderS() {
  const [startup, setStartup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [motivationText, setMotivationText] = useState("");
  const [currentCardId, setCurrentCardId] = useState(null);
  
  const session = JSON.parse(localStorage.getItem('session'));
  const id = session?.id;
  
  useEffect(() => {
    const fetchStudent = async () => {
      const data = await getTinder({ id });
      if (data) setStartup(data);
      console.log(data);
    };
    
    if (id) {
      fetchStudent();
    }
  }, []);

  // Initialize the tinder card interactions after the component has rendered
  useEffect(() => {
    if (startup.length > 0) {
      // Small timeout to ensure DOM is fully rendered
      setTimeout(() => {
        initTinderCardsWithModal(showLikeModal);
      }, 100);
    }
  }, [startup]);

  // Function to show the motivation modal
  const showLikeModal = (cardId) => {
    setCurrentCardId(cardId);
    setMotivationText("");
    setShowModal(true);
  };

  // Function to handle form submission
  const handleSubmitMotivation = () => {
    if (motivationText.trim() === "") {
      alert("Please enter your motivation text");
      return;
    }
    
    // Process the like with motivation text
    submitLike(currentCardId, motivationText);
    setShowModal(false);
    
    // Find and remove the card from DOM
    const card = document.querySelector(`.profil_tinder[data-id="${currentCardId}"]`);
    if (card) {
      card.classList.add('swipe-right');
      setTimeout(() => {
        if (card && card.parentNode) {
          card.remove();
          updateCardsPosition();
        }
      }, 500);
    }
  };

  // Function to submit the like and apply with motivation
  const submitLike = (likedId, motivation) => {
    console.log('Liked:', likedId, 'Motivation:', motivation);
    const session = JSON.parse(localStorage.getItem('session'));
    const id = session?.id;
    
    // First API call: Like the account
    fetch('http://localhost:3000/match/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        from: id, 
        to: parseInt(likedId) 
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erreur lors du like: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Like enregistré:', data);
      
      // Second API call: Apply to the offer with motivation
      return fetch('http://localhost:3000/offer/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          student: id, 
          offer: parseInt(likedId), 
          motivation: motivation 
        }),
      });
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erreur lors de l'application: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Application avec motivation enregistrée:', data);
    })
    .catch((err) => {
      console.error('Erreur API:', err);
    });
  };

  // Helper to update cards position
  const updateCardsPosition = () => {
    const remainingCardElements = document.querySelectorAll('.profil_tinder');
    const remainingCards = remainingCardElements.length;
    
    // Update the position for the remaining cards
    remainingCardElements.forEach((card, index) => {
      // Calculate the inverse index to ensure last card is on top
      const inverseIndex = remainingCards - index - 1;
      
      // Set z-index and transform for proper stacking
      if (inverseIndex === 0) { // Bottom card
        card.style.zIndex = 1;
        card.style.transform = `translateY(-40px) `;
      } else if (inverseIndex === 1) {
        card.style.zIndex = 2;
        card.style.transform = `translateY(-30px) `;
      } else if (inverseIndex === 2) {
        card.style.zIndex = 3;
        card.style.transform = `translateY(-20px) `;
      } else if (inverseIndex === 3) {
        card.style.zIndex = 4;
        card.style.transform = `translateY(-10px) `;
      } else { // Top card
        card.style.zIndex = 5;
        card.style.transform = 'translateY(0) ';
      }
    });
  };

  return (
    <div className="tin_centre">
      <div className="Tinder_container">
        {startup.map((s) => (
          <div key={s.account_id} className="profil_tinder" data-id={s.account_id}>
            {/* Like indicator - Green circle with heart */}
            <div className="action-indicator like-indicator">
              <div className="like-icon"></div>
            </div>
            
            {/* Nope indicator - Red circle with X */}
            <div className="action-indicator nope-indicator">
              <div className="nope-icon"></div>
            </div>
            
            <div className="img_title">
              <img src={s.image ? s.image : "/no_image.jpg"} alt={s.name} />
              <div>
                <h3 className="name">{s.name}</h3>
                <p>{s.product}</p>
              </div>
            </div>
            
            <div className="line"></div>
            <div className="info">
              <div>
                <p>{s.pitch}</p>
              </div>
              <div><img src="/product.svg" alt="product" /><p>{s.product}</p></div>
              <div><img src="/range.svg" alt="range" /><p>{s.range}</p></div>
              <div><img src="/person.svg" alt="person" /><p>{s.client}</p></div>
              <div><img src="/sector.svg" alt="sector" /><p>{s.startup.sector.join(", ")}</p></div>
              <div><img src="/location.svg" alt="location" /><p>{s.startup.region}</p></div>
              <div><img src="/home_work.svg" alt="work mode" /><p>{s.work_mode}</p></div>
              <div><img src="/commission.svg" alt="commission" /><p>{s.commission}</p></div>
            </div>
          </div>
        ))}
        <div className="no-students-message">
          <h3>No more Offers</h3>
          <p>There are no more Offers available at the moment. Check back later!</p>
        </div>
      </div>
      
      {/* Motivation Modal */}
      {showModal && (
        <div className="motivation-modal-overlay">
          <div className="motivation-modal">
            <h3>Why are you interested?</h3>
            <p>Please write a short motivation text in English</p>
            
            <div className="motivation-form">
              <textarea 
                value={motivationText}
                onChange={(e) => setMotivationText(e.target.value)}
                placeholder="Write your motivation here..."
                rows={5}
              />
              
              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="submit-btn" onClick={handleSubmitMotivation}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TinderS;