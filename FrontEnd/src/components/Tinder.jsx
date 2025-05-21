import { useEffect, useState } from "react"
import "../styles/tinder.css"
import { getTinder } from "../scripts/getData";
import { initTinderCards } from "../scripts/tinder";

function Tinder() {
   const [student, setStudent] = useState([]);
   const session = JSON.parse(localStorage.getItem('session'));
   const id = session?.id;
   
   useEffect(() => {
      const fetchStudent = async () => {
         const data = await getTinder({ id });
         if (data) setStudent(data);
         console.log(data);
      };
      
      if (id) {
         fetchStudent();
      }
   }, []);

   // Initialize the tinder card interactions after the component has rendered
   useEffect(() => {
      if (student.length > 0) {
         // Small timeout to ensure DOM is fully rendered
         setTimeout(() => {
            initTinderCards();
         }, 100);
      }
   }, [student]);

   return (
      <div className="tin_centre">
      <div className="Tinder_container">
         {student.map((s) => (
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
                      <p>{s.surname}</p>
                  </div>
               </div>

               <div className="line"></div>
               <div className="info">
                  <div><p>{s.description}</p></div>
                  <div> <img src="/school.svg" alt="School" /><p>{s.school}</p></div>
                  <div> <img src="/location.svg" alt="Location" /><p>{s.region}</p></div>
                  <div><img src="/spoken.svg" alt="Languages" /><p>{s.languages.join(", ")}</p></div>
                  <div> <img src="/sector.svg" alt="Sector" /><p>{s.sector.join(", ")}</p></div>
                  <div> <img src="/dispo.svg" alt="Availability" /><p>{s.disponibility}</p></div>
               </div>
            </div>

         ))}
         <div className="no-students-message">
               <h3>No more students</h3>
               <p>There are no more students available at the moment. Check back later!</p>
         </div>
      </div>
      </div>
   )
}

export default Tinder