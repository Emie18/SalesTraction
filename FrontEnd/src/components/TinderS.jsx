import { useEffect, useState, useRef } from "react";
import "../styles/tinder.css";
import ItsAmatch from "./ItsAmatch"
import { API } from '../scripts/api';

function TinderS() {
  const [startup, setStartup] = useState([]);
  const [ismatch, setIsmatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [motivationText, setMotivationText] = useState("");
  const [currentCardId, setCurrentCardId] = useState({});
  const [datamatch, setDatamatch] =useState(null);
  const session = JSON.parse(localStorage.getItem("session"));
  const id = session?.id;
  const hasRun = useRef(false);

  // Récupère les suggestions à afficher
  useEffect(() => {
    if (!id || hasRun.current) return;
    hasRun.current = true;
    
    API.get(`/match/suggestion/${id}`)
      .then(res => res.json())
      .then(data => { setStartup(data); })
  }, [id]);

  useEffect(() => {
    if (startup.length > 0) setTimeout(() => initTinderCards(), 100);
  }, [startup]);

  function initTinderCards() {
    const cards = document.querySelectorAll(".profil_tinder");

    let activeCard = null;
    let initialX = 0;
    let currentX = 0;
    let moved = false;

    updateCardsPosition(); // Position initiale des cartes

    // Met à jour la position des cartes restantes avec effet visuel
    function updateCardsPosition() {
      const remaining = document.querySelectorAll(".profil_tinder");
      if(remaining.length > 0){
        cards.forEach(card => { card.removeEventListener("mousedown", startDrag) })
        remaining[0].addEventListener("mousedown", startDrag);
      }

      remaining.forEach((card, index) => {
        const z = remaining.length - index;
        card.style.zIndex = z;
        card.style.transform = `translateY(${-10 * index}px)`; // effet d'empilement en Y
      });
    }

    // Envoie un like à l'API
    function handleLike(card) {
      const startup_id = parseInt(card.getAttribute("startup-id"));
      const offer_id = parseInt(card.getAttribute("data-id"));
      setCurrentCardId({startup : startup_id, offer: offer_id});
      setShowModal(true);
    }

    // Gestion du "nope" (non intéressé)
    function handleNope(card) { console.log("Noped:", card.getAttribute("data-id")) }

    // Début du drag : prépare les valeurs de base
    function startDrag(e) {
      activeCard = e.currentTarget;
      activeCard.classList.add("dragging");
      initialX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      currentX = initialX;
      moved = false;

      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
    }

    // Pendant le drag : calcule la translation
    function drag(e) {
      if (!activeCard) return;
      currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - initialX;

      if (Math.abs(deltaX) > 50) moved = true;

      activeCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
      activeCard.classList.toggle("swiping-right", deltaX > 50);
      activeCard.classList.toggle("swiping-left", deltaX < -50);
    }

    // Fin du drag : décide si la carte est swipée ou revient à sa place
    function endDrag() {
      if (!activeCard) return;
      const deltaX = currentX - initialX;

      // Si l'utilisateur a cliqué sans bouger la souris, on ne fait rien
      if (!moved) {
        activeCard.style.transform = `translateY(0px)`; // revient exactement à sa place
        activeCard.classList.remove("dragging", "swiping-left", "swiping-right");
        activeCard = null;
        cleanup();
        return
      }

      // Swipe à droite
      if (deltaX > 100) {
        activeCard.classList.add("swipe-right");
        handleLike(activeCard);
        activeCard.style.transform = `translateX(0) translateY(0) rotate(0)`;

        setTimeout(() => { 
          if(activeCard){
            activeCard.remove()
            activeCard = null;
          }
          updateCardsPosition()
        }, 300);
        
      } else if (deltaX < -100) { // Swipe à gauche
        activeCard.classList.add("swipe-left");
        handleNope(activeCard);

        setTimeout(() => { 
          if(activeCard){
            activeCard.remove()
            activeCard = null;
          }
          updateCardsPosition()
        }, 300);
        
      } else { // Pas assez de mouvement : retour à la position initiale
        activeCard.style.transform = `translateX(0) translateY(0) rotate(0)`;
      }

      activeCard.classList.remove("dragging", "swiping-left", "swiping-right");
      cleanup();
    }

    // Supprime les listeners pour éviter les fuites mémoire
    function cleanup() {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
    }
  }

  // Function to handle form submission
  const handleSubmitMotivation = () => {
    if (motivationText.trim() === "") {
      alert("Please enter your motivation text");
      return;
    }
    
    // Process the like with motivation text
    const startup_id = currentCardId.startup;
    const offer_id = currentCardId.offer;

    console.log(JSON.stringify({ from: id, to: startup_id }));
    // First API call: Like the account
    API.post("/match/like", JSON.stringify({ from: id, to: startup_id }), {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
      setIsmatch(data.is_match);
      setDatamatch(data);
      console.log(data);
      API.post("/offer/apply", JSON.stringify({ student: id, offer: offer_id, motivation: motivationText }), {
        headers: { "Content-Type": "application/json" }  
      });
    }).catch(error => console.log(error))
    
    setShowModal(false);
  };

  return (
    <div className="tin_centre">
      <div className="Tinder_container">
        {startup.map((s, i) => (
          <div key={s.id} className="profil_tinder" data-id={s.id} startup-id={s.startup.account_id} style={{ '--index': i }}>
            <div className="action-indicator like-indicator"><div className="like-icon"></div></div>
            <div className="action-indicator nope-indicator"><div className="nope-icon"></div></div>
            <div className="img_title">
              <img src={s.image ? API.make_url(s.image) : "/no_image.jpg"} alt={s.name} />
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
              <div><img src="/sector.svg" alt="sector" /><p>{s.startup?.sector?.join(", ")}</p></div>
              <div><img src="/location.svg" alt="location" /><p>{s.startup?.region}</p></div>
              <div><img src="/home_work.svg" alt="work mode" /><p>{s.work_mode}</p></div>
              <div><img src="/commission.svg" alt="commission" /><p>{s.commission}</p></div>
            </div>
          </div>
        ))}

        <div className="no-students-message">
          <h3>No more Offers</h3>
          <p>There are no more Offers available at the moment. Check back later!</p>
        </div>
        
        {ismatch && <p>match</p>}
      </div>
      
      {/* Motivation Modal */}
      {showModal && (
        <div className="motivation-modal-overlay">
          <div className="motivation-modal">
            <h3>Why are you interested?</h3>
            <p>Please write a short motivation</p>
            
            <div className="motivation-form">
              <textarea 
                value={motivationText}
                onChange={(e) => setMotivationText(e.target.value)}
                placeholder="Write your motivation here..."
                rows={5}
              />
              
              <div className="modal-buttons">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn" 
                  onClick={handleSubmitMotivation}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {ismatch && <ItsAmatch match={datamatch} id={datamatch.startup.account_id} setIsmatch={setIsmatch} startup={true}/>}
    </div>
  );
}

export default TinderS;