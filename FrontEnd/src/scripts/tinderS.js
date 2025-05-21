/**
 * Tinder Card Interaction Script with Motivation Modal
 * This script adds dragging/swiping functionality to the tinder cards
 * with added support for a motivation form modal
 */

// Add this script at the end of your component or in a separate file to import
export function initTinderCardsWithModal(showLikeModalCallback) {
  const cards = document.querySelectorAll('.profil_tinder');
  const container = document.querySelector('.Tinder_container');
  let activeCard = null;
  let initialX = 0;
  let currentX = 0;
  let remainingCards = cards.length;
  
  // Helper to find the next card to display after swipe
  function updateCardsPosition() {
    const remainingCardElements = document.querySelectorAll('.profil_tinder');
    remainingCards = remainingCardElements.length;
 
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
  }

  // Function to handle the Like action
  function handleLike(card) {
    const likedId = card.getAttribute('data-id');
    // Show motivation modal instead of immediately liking
    showLikeModalCallback(likedId);
    
    // The actual like submission will be handled by the modal's submit button
    // This prevents the card from being removed immediately
    return false; // Return false to indicate we're handling this differently
  }

  // Function to handle the Nope action
  function handleNope(card) {
    console.log('Noped:', card.getAttribute('data-id'));
    return true; // Return true to allow normal processing (card removal)
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
        activeCard.classList.add('swiping-right');
        const shouldRemove = handleLike(activeCard);
        
        // Only remove the card if handleLike returns true
        // In our case, handleLike returns false to delay removal until after modal
        if (shouldRemove) {
          setTimeout(() => {
            if (activeCard && activeCard.parentNode) {
              activeCard.remove();
              updateCardsPosition();
            }
          }, 500);
        } else {
          // Reset the card position since we're showing a modal instead
          setTimeout(() => {
            activeCard.classList.remove('swiping-right');
            activeCard.style.transform = 'translateY(0)';
          }, 300);
        }
        
      } else if (deltaX < -100) {
        // Swipe Left - Nope
        activeCard.classList.add('swipe-left');
        handleNope(activeCard);
        setTimeout(() => {
          if (activeCard && activeCard.parentNode) {
            activeCard.remove();
            updateCardsPosition();
          }
        }, 500);
      } else {
        // Return card to original position
        activeCard.style.transform = 'translateY(0)';
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
  
  // Initial positioning of cards
  updateCardsPosition();
}