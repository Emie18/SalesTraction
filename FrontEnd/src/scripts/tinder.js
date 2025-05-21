/**
 * Tinder Card Interaction Script
 * This script adds dragging/swiping functionality to the tinder cards
 */

// Add this script at the end of your component or in a separate file to import
export function initTinderCards() {
  const cards = document.querySelectorAll('.profil_tinder');
  let activeCard = null;
  let initialX = 0;
  let currentX = 0;
  
  // Helper to find the next card to display after swipe
  function updateCardsPosition() {
    cards.forEach((card, index) => {
      // Skip the card that was swiped
      if (card === activeCard) return;
      
      // Move up cards in the stack
      if (index < cards.length - 1) {
        card.style.transform = index === 0 ? 
          'translateY(0) scale(1)' : 
          `translateY(-${index * 10}px) scale(${1 - index * 0.02})`;

        card.style.zIndex = cards.length - index;
      }
    });
  }

  // Function to handle the Like action
  function handleLike(card) {
    console.log('Liked:', card.getAttribute('key'));
    // Here you would add API call to save the "like" action
    // For example: saveLikeAction(card.getAttribute('key'));
  }

  // Function to handle the Nope action
  function handleNope(card) {
    console.log('Noped:', card.getAttribute('key'));
    // Here you would add API call to save the "nope" action
    // For example: saveNopeAction(card.getAttribute('key'));
  }

  cards.forEach(card => {
    // Mouse Events
    card.addEventListener('mousedown', startDrag);
    
    // Touch Events for mobile
    card.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
      activeCard = card;
      card.classList.add('dragging');
      
      // Get initial position
      initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      currentX = initialX;
      
      // Add move and end event listeners
      if (e.type === 'mousedown') {
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
      } else {
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
      }
      
      e.preventDefault();
    }
    
    function drag(e) {
      if (!activeCard) return;
      
      // Calculate how far we've moved
      currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - initialX;
      
      // Apply transformation to the card
      activeCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
      
      // Add visual indicator classes based on swipe direction
      if (deltaX > 50) {
        activeCard.classList.add('swiping-right');
        activeCard.classList.remove('swiping-left');
      } else if (deltaX < -50) {
        activeCard.classList.add('swiping-left');
        activeCard.classList.remove('swiping-right');
      } else {
        activeCard.classList.remove('swiping-left', 'swiping-right');
      }
    }
    
    function endDrag(e) {
      if (!activeCard) return;
      
      const deltaX = currentX - initialX;
      
      // Determine if swipe distance is enough to register as action
      if (deltaX > 100) {
        // Swipe Right - Like
        activeCard.classList.add('swipe-right');
        handleLike(activeCard);
        setTimeout(() => {
          activeCard.remove();
          updateCardsPosition();
        }, 500);
      } else if (deltaX < -100) {
        // Swipe Left - Nope
        activeCard.classList.add('swipe-left');
        handleNope(activeCard);
        setTimeout(() => {
          activeCard.remove();
          updateCardsPosition();
        }, 500);
      } else {
        // Return card to original position
        activeCard.style.transform = '';
      }
      
      // Clean up
      activeCard.classList.remove('dragging', 'swiping-left', 'swiping-right');
      activeCard = null;
      
      // Remove event listeners
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);
    }
  });
}
