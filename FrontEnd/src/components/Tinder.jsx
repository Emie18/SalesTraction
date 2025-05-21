import { useEffect, useState } from "react";
import "../styles/tinder.css";

function Tinder() {
  const [students, setStudents] = useState([]);
  const session = JSON.parse(localStorage.getItem("session"));
  const id = session?.id;

  // Récupère les suggestions à afficher
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/match/suggestion/${id}`)
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setTimeout(() => initTinderCards(), 100);
      });
  }, [id]);

  function initTinderCards() {
    const cards = document.querySelectorAll(".profil_tinder");

    let activeCard = null;
    let initialX = 0;
    let currentX = 0;
    let moved = false;

    // Met à jour la position des cartes restantes avec effet visuel
    function updateCardsPosition() {
      const remaining = document.querySelectorAll(".profil_tinder");
      remaining.forEach((card, index) => {
        const z = remaining.length - index;
        card.style.zIndex = z;
        card.style.transform = `translateY(${-10 * index}px)`; // effet d'empilement en Y
      });
    }

    // Envoie un like à l'API
    function handleLike(card) {
      const likedId = parseInt(card.getAttribute("data-id"));
      fetch("http://localhost:3000/match/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: id, to: likedId }),
      })
        .then(res => res.json())
        .then(data => console.log("Liked:", data))
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
      document.addEventListener("touchmove", drag);
      document.addEventListener("touchend", endDrag);
    }

    // Pendant le drag : calcule la translation
    function drag(e) {
      if (!activeCard) return;
      currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - initialX;

      if (Math.abs(deltaX) > 5) moved = true;

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
        return;
      }

      // Swipe à droite
      if (deltaX > 100) {
        activeCard.classList.add("swipe-right");
        handleLike(activeCard);
        setTimeout(() => {
          activeCard.remove();
          updateCardsPosition();
        }, 300);
      }
      // Swipe à gauche
      else if (deltaX < -100) {
        activeCard.classList.add("swipe-left");
        handleNope(activeCard);
        setTimeout(() => {
          activeCard.remove();
          updateCardsPosition();
        }, 300);
      }
      // Pas assez de mouvement : retour à la position initiale
      else {
        activeCard.style.transform = `translateX(0) translateY(0) rotate(0)`;
      }

      activeCard.classList.remove("dragging", "swiping-left", "swiping-right");
      activeCard = null;
      cleanup();
    }

    // Supprime les listeners pour éviter les fuites mémoire
    function cleanup() {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", drag);
      document.removeEventListener("touchend", endDrag);
    }

    // Active le drag pour chaque carte
    cards.forEach(card => {
      card.addEventListener("mousedown", startDrag);
      card.addEventListener("touchstart", startDrag);
    });

    updateCardsPosition(); // Position initiale des cartes
  }

  return (
    <div className="tin_centre">
      <div className="Tinder_container">
        {students.map((s,i) => (
          <div key={s.account_id} className="profil_tinder" data-id={s.account_id} style={{ '--index': i }}>
            <div className="action-indicator like-indicator"><div className="like-icon"></div></div>
            <div className="action-indicator nope-indicator"><div className="nope-icon"></div></div>
            <div className="img_title">
              <img src={s.image || "/no_image.jpg"} alt={s.name} />
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
        
      </div>
    </div>
  );
}

export default Tinder;
