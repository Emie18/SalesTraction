import { useEffect, useState, useRef } from "react";
import "../styles/tinder.css";

import { API } from '../scripts/api';

function Tinder() {
  const [students, setStudents] = useState([]);
  const session = JSON.parse(localStorage.getItem("session"));
  const id = session?.id;
  const[ismatch,setIsmatch]=useState(false);

  const hasRun = useRef(false);

  // Récupère les suggestions à afficher
  useEffect(() => {
    if (!id || hasRun.current) return;
    hasRun.current = true
    
    API.get(`/match/suggestion/${id}`)
      .then(res => res.json())
      .then(data => { setStudents(data) })
  }, [id]);

  useEffect(() => {
    if (students.length > 0) setTimeout(() => initTinderCards(), 100);
  }, [students]);

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
      const likedId = parseInt(card.getAttribute("data-id"));
      API.post("/match/like", JSON.stringify({ from: id, to: likedId }), {headers: { "Content-Type": "application/json" }})
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setIsmatch(data.is_match)
        })
        .catch(err => console.error("Like error:", err));
    }

    // Gestion du "nope" (non intéressé)
    function handleNope(card) {
      console.log("Noped:", card.getAttribute("data-id"));
    }

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

  return (
    <div className="tin_centre">
      <div className="Tinder_container">
        {students.map((s,i) => (
          <div key={s.account_id} className="profil_tinder" data-id={s.account_id} style={{ '--index': i }}>
            <div className="action-indicator like-indicator"><div className="like-icon"></div></div>
            <div className="action-indicator nope-indicator"><div className="nope-icon"></div></div>
            <div className="img_title">
              <img src={s.image ? API.make_url(s.image) : "/no_image.jpg"} alt={s.name} />
              <div><h3 className="name">{s.name}</h3><p>{s.surname}</p></div>
            </div>
            <div className="line"></div>
            <div className="info">
              <p>{s.description}</p>
              <div><img src="/school.svg" alt="School" /><p>{s.school}</p></div>
              <div><img src="/location.svg" alt="Location" /><p>{s.region}</p></div>
              <div><img src="/spoken.svg" alt="Languages" /><p>{s.languages.join(", ")}</p></div>
              <div><img src="/sector.svg" alt="Sector" /><p>{s.sector.join(", ")}</p></div>
              <div><img src="/dispo.svg" alt="Availability" /><p>{s.disponibility}</p></div>
            </div>
          </div>
        ))}


          <div className="no-students-message">
            <h3>No more students</h3>
            <p>There are no more students available at the moment. Check back later!</p>
          </div>
          {ismatch && 
          <p>match</p>}

      </div>
    </div>
  );
}

export default Tinder;
