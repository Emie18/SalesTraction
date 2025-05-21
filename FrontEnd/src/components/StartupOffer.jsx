import NewOffer from "../pages/NewOffer"
import { useEffect, useState } from "react"
import '../styles/offer.css'
import { getOffers_for_Startup } from "../scripts/getData";
function StartupOffer() {
   const [open, setOpen] = useState(false);

   // Fonction pour gérer l'ouverture du composant NewOffer
   const handleOpenModal = () => {
      setOpen(true);
   };
   const [soffer, setSoffer] = useState([]);
   const session = JSON.parse(localStorage.getItem('session'));
   const id = session?.id;
   console.log(id)


   // Fonction pour fermer le composant NewOffer
   const handleCloseModal = () => {
      setOpen(false);
   };
   useEffect(() => {
      const fetchOffer = async () => {
         const data = await getOffers_for_Startup({ id });
         if (data) setSoffer(data);
         console.log(data);

      };
      if (id) {
         fetchOffer();
      }

   }, [open, id]);
   const handleDeleteOffer = async (offerId) => {
if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      try {
         const response = await fetch(`http://localhost:3000/offer/delete?id=${offerId}`, {
            method: 'DELETE',
         });

         if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
         }

         // Supprimer l'offre localement pour mettre à jour l'affichage
         setSoffer((prev) => prev.filter((offer) => offer.id !== offerId));
      } catch (error) {
         console.error("Erreur de suppression :", error);
      }
   }
   };


   return (
      <div className="offer_page">
         {/* Utilisez une fonction fléchée pour le onClick */}
         {!open && (
            <button className='create_offer_button_abs' onClick={() => setOpen(true)}>Créer une offre</button>
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

         <div className="container_offer mag">

            {soffer.map((offer) => (
               <div key={offer.id} className="offer">
                  <div className="img_title">
                     <img src={offer.startup.image ? offer.startup.image : "/no_image.jpg"}></img>
                     <div><h3 className="product">{offer.startup.name}</h3>
                        <p>{offer.name}</p></div>
                  </div>
                  <div className="line"></div>
                  <p className="pitch">{offer.pitch}</p>
                  <div className="info">
                     <div> <img src="/product.svg"></img><p>{offer.product}</p></div>
                     <div> <img src="/range.svg"></img><p>{offer.range}</p></div>
                     <div><img src="/person.svg"></img><p>{offer.client}</p></div>
                     <div> <img src="/sector.svg"></img><p>{offer.startup.sector.join(", ")}</p></div>
                     <div> <img src="/location.svg"></img><p>{offer.startup.region}</p></div>
                     <div> <img src="/home_work.svg"></img><p>{offer.work_mode}</p></div>
                     <div><img src="/commission.svg" alt="commision" /><p>{offer.commission}</p></div>
                  </div>
                  {/* <div className="postule">
                     <button onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
                  </div> */}
               </div>
            ))}
         </div>
      </div>
   )
}

export default StartupOffer