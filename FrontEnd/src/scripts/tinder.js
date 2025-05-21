
export function initTinderCards() {
  // Sélection de tous les éléments de profil et du conteneur
  const cards = document.querySelectorAll('.profil_tinder');
  const container = document.querySelector('.Tinder_container');
  
  // Variables pour gérer le glissement
  let activeCard = null;        // Carte actuellement manipulée
  let initialX = 0;             // Position X initiale du toucher/clic
  let currentX = 0;             // Position X actuelle pendant le glissement
  let remainingCards = cards.length;  // Nombre de cartes restantes
  
  /**
   * Fonction pour mettre à jour la position des cartes
   * Organise les cartes en pile avec un léger décalage pour l'effet visuel
   */
  function updateCardsPosition() {
    // Sélection des cartes restantes
    const remainingCardElements = document.querySelectorAll('.profil_tinder');
    remainingCards = remainingCardElements.length;
 
    // Parcours de chaque carte pour définir sa position
    remainingCardElements.forEach((card, index) => {
      // Calcul de l'index inverse pour que la dernière carte soit au-dessus
      const inverseIndex = remainingCards - index - 1;
      
      // Définition du z-index et de la transformation pour l'empilement
      // Les cartes du dessous sont légèrement décalées vers le haut pour l'effet visuel
      if (inverseIndex === 0) {       // Carte du fond
        card.style.zIndex = 1;
        card.style.transform = `translateY(-40px)`;
      } else if (inverseIndex === 1) {
        card.style.zIndex = 2;
        card.style.transform = `translateY(-30px)`;
      } else if (inverseIndex === 2) {
        card.style.zIndex = 3;
        card.style.transform = `translateY(-20px)`;
      } else if (inverseIndex === 3) {
        card.style.zIndex = 4;
        card.style.transform = `translateY(-10px)`;
      } else {                       // Carte du dessus
        card.style.zIndex = 5;
        card.style.transform = 'translateY(0)';
      }
    });
  }

  /**
   * Fonction pour gérer l'action "Like"
   * Envoie une requête à l'API pour enregistrer le like
   */
  function handleLike(card) {
    // Récupération de l'ID du profil liké
    const likedId = parseInt(card.getAttribute('data-id'));
    
    // Récupération des données de session de l'utilisateur
    const session = JSON.parse(localStorage.getItem('session'));
    const id = session?.id;
    
    // Appel à l'API pour enregistrer le like
    fetch('http://localhost:3000/match/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: id, to: likedId }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erreur lors du like: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Like enregistré:', data);
    })
    .catch((err) => {
      console.error('Erreur API like:', err);
    });
  }

  /**
   * Fonction pour gérer l'action "Nope" (rejet)
   * Pour l'instant, cette fonction ne fait que logger l'action
   */
  function handleNope(card) {
    console.log('Noped:', card.getAttribute('data-id'));
    // Ici, vous pourriez ajouter un appel API pour enregistrer l'action "nope"
  }

  // Application des écouteurs d'événements à chaque carte
  cards.forEach(card => {
    // Événements pour souris et tactile
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', startDrag);
    
    /**
     * Fonction déclenchée au début du glissement
     */
    function startDrag(e) {
      activeCard = card;
      card.classList.add('dragging');  // Ajout d'une classe pour les styles CSS
      
      // Récupération de la position initiale du toucher/clic
      initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      currentX = initialX;
      
      // Ajout des écouteurs pour suivre le mouvement
      if (e.type === 'mousedown') {
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
      } else {
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
      }
      
      e.preventDefault();  // Empêche le comportement par défaut du navigateur
    }
    
    /**
     * Fonction pour gérer le glissement en cours
     */
    function drag(e) {
      if (!activeCard) return;
      
      // Calcul de la distance parcourue
      currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - initialX;
      
      // Application de la transformation à la carte (déplacement + rotation)
      activeCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
      
      // Ajout d'indicateurs visuels selon la direction du swipe
      if (deltaX > 50) {  // Vers la droite (like)
        activeCard.classList.add('swiping-right');
        activeCard.classList.remove('swiping-left');
      } else if (deltaX < -50) {  // Vers la gauche (nope)
        activeCard.classList.add('swiping-left');
        activeCard.classList.remove('swiping-right');
      } else {  // Position neutre
        activeCard.classList.remove('swiping-left', 'swiping-right');
      }
    }
    
    /**
     * Fonction déclenchée à la fin du glissement
     */
    function endDrag(e) {
      if (!activeCard) return;
      
      const deltaX = currentX - initialX;
      
      // Détermination de l'action selon la distance du swipe
      if (deltaX > 100) {  // Swipe à droite - Like
        activeCard.classList.add('swipe-right');
        handleLike(activeCard);
        // Suppression de la carte après animation
        setTimeout(() => {
          if (activeCard && activeCard.parentNode) {
            activeCard.remove();
            updateCardsPosition();  // Mise à jour des positions des cartes restantes
          }
        }, 500);
      } else if (deltaX < -100) {  // Swipe à gauche - Nope
        activeCard.classList.add('swipe-left');
        handleNope(activeCard);
        // Suppression de la carte après animation
        setTimeout(() => {
          if (activeCard && activeCard.parentNode) {
            activeCard.remove();
            updateCardsPosition();  // Mise à jour des positions des cartes restantes
          }
        }, 500);
      } else {  // Pas assez de distance - retour à la position d'origine
        activeCard.style.transform = 'translateY(0)';
      }
      
      // Nettoyage des classes et variables
      activeCard.classList.remove('dragging', 'swiping-left', 'swiping-right');
      activeCard = null;
      
      // Suppression des écouteurs d'événements
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);
    }
  });
  
  // Positionnement initial des cartes
  updateCardsPosition();
}