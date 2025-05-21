import { useEffect, useState } from "react"
import "../styles/tinder.css"
import { getTinder } from "../scripts/getData";
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

   return (
      <div className="Tinder_container">
         {student.map((s) => (
            <div key={s.id} className="profil_tinder">

               <div className="img_title">
                  <img src={s.image ? s.image : "/no_image.jpg"}></img>
                  <div>
                      <h3 className="name">{s.name}</h3>
                      <p>{s.surname}</p>
                  </div>
                 
               </div>

               <div className="line"></div>
               <div className="info">
                  <div><p>{s.description}</p></div>
                  <div> <img src="/school.svg"></img><p>{s.school}</p></div>
                  <div> <img src="/location.svg"></img><p>{s.region}</p></div>
                  <div><img src="/spoken.svg"></img><p>{s.languages.join(", ")}</p></div>
                  <div> <img src="/sector.svg"></img><p>{s.sector.join(", ")}</p></div>
                  <div> <img src="/dispo.svg"></img><p>{s.disponibility}</p></div>
               </div>
            </div>))}
      </div>
   )
}

export default Tinder