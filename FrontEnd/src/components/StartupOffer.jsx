import NewOffer from "../pages/NewOffer"
import { useState } from "react"
import '../styles/offer.css'
function StartupOffer() {
   const [open, setOpen] = useState(false);

   // Fonction pour gérer l'ouverture du composant NewOffer
   const handleOpenModal = () => {
      setOpen(true);
   };

   // Fonction pour fermer le composant NewOffer
   const handleCloseModal = () => {
      setOpen(false);
   };

   return (
      <div className="offer_page">
         {/* Utilisez une fonction fléchée pour le onClick */}
         {!open && (
            <button  className='create_offer_button_abs'onClick={() => setOpen(true)}>Créer une offre</button>
         )}
         

         {/* Afficher conditionnellement le composant NewOffer */}
         {open && (
            <div className="modal-overlay">
               <div className="modal-content">
                  <button className="close-button" onClick={() => setOpen(false)}>×</button>
                  <NewOffer onSubmitSuccess={handleCloseModal} />
               </div>
            </div>
         )}

         <div className="container_offer">


            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
            <div className="offer"></div>
         </div>
      </div>
   )
}

export default StartupOffer