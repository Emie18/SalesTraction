import { useState } from "react";
import { applyToOffer } from "../scripts/apply";

function ContainerOffer({ offers }) {
   const [showModal, setShowModal] = useState(false);
   const [motivation, setMotivation] = useState("");
   const [currentOffer, setCurrentOffer] = useState(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [message, setMessage] = useState({ text: "", type: "" });
   const session = JSON.parse(localStorage.getItem('session'));
   const id = session?.id;
   // Fonction pour ouvrir la modale
   const openModal = (offer) => {
      setCurrentOffer(offer);
      setMotivation("");
      setMessage({ text: "", type: "" });
      setShowModal(true);
   };

   // Fonction pour fermer la modale
   const closeModal = () => {
      setShowModal(false);
      setCurrentOffer(null);
      setMotivation("");
      setMessage({ text: "", type: "" });
   };

   // Fonction pour gérer la soumission
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!motivation.trim()) {
         setMessage({ text: "Please enter your motivation", type: "error" });
         return;
      }
      setIsSubmitting(true);

      try {
  
         const result = await applyToOffer(id, currentOffer.id, motivation);
         console.log(result); // Affichera { success: true }

         setMessage({ text: "Application submitted successfully! \n This window will close in 2 seconds", type: "success" });

         // Fermer la modale après un court délai pour permettre à l'utilisateur de voir le message de succès
         setTimeout(() => {
            closeModal();
         }, 2000);
      } catch (error) {
         console.log("errer");
         setMessage({ text: "Failed to submit application. Please try again.", type: "error" });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="container_offer">
         {offers.map((offer) => (
            <div key={offer.id} className="offer">
               <div className="img_title">
                  <img src={offer.startup.image ? offer.startup.image : "/no_image.jpg"} alt={offer.startup.name}></img>
                  <div>
                     <h3 className="product">{offer.startup.name}</h3>
                     <p>{offer.name}</p>
                  </div>
               </div>
               <div className="line"></div>
               <p className="pitch">{offer.pitch}</p>
               <div className="info">
                  <div> <img src="/product.svg" alt="product"></img><p>{offer.product}</p></div>
                  <div> <img src="/range.svg" alt="range"></img><p>{offer.range}</p></div>
                  <div> <img src="/person.svg" alt="person"></img><p>{offer.client}</p></div>
                  <div> <img src="/sector.svg" alt="sector"></img><p>{offer.startup.sector.join(", ")}</p></div>
                  <div> <img src="/location.svg" alt="location"></img><p>{offer.startup.region}</p></div>
                  <div> <img src="/home_work.svg" alt="work mode"></img><p>{offer.work_mode}</p></div>
                  <div> <img src="/commission.svg" alt="commission" /><p>{offer.commission}</p></div>
               </div>
               <div className="postule">
                  <button onClick={() => openModal(offer)}>Apply</button>
               </div>
            </div>
         ))}

         {/* Fenêtre modale */}
         {showModal && currentOffer && (
            <div className="modal-overlay">
               <div className="modal-content">
                  <h2>Apply to {currentOffer.name}</h2>
                  <p>Position at {currentOffer.startup.name}</p>

                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label htmlFor="motivation">Your Motivation:</label>
                        <textarea
                           id="motivation"
                           value={motivation}
                           onChange={(e) => setMotivation(e.target.value)}
                           placeholder="Please explain why you are interested in this position..."
                           rows={6}
                           disabled={isSubmitting}
                        />
                     </div>

                     {message.text && (
                        <div className={`message ${message.type}`}>
                           {message.text}
                        </div>
                     )}

                     <div className="modal-buttons">
                        <button
                           type="button"
                           onClick={closeModal}
                           disabled={isSubmitting}
                           className="cancel-button"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="submit-button"
                        >
                           {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}

export default ContainerOffer;