import React, { useEffect, useState } from "react";
import { getOffers_for_Startup } from "../scripts/getData";
import { useState, useEffect } from 'react';
function Carousel() {
 const [soffer, setSoffer] = useState([]);
 const session = JSON.parse(localStorage.getItem('session'));
   const id = session?.id;
    useEffect(() => {
          const fetchOffer = async () => {
             const data = await getOffers_for_Startup({ id });
             if (data) setSoffer(data);
             console.log(data);
    
          };
          if (id) {
             fetchOffer();
          }
    
       }, [id]);
  return (
    <div className="carouselle_startup">
     
                   {soffer.map((offer) => (
               <div key={offer.id} className="slide">
                  <div className="titleSlide">
                     <img src={offer.startup.image ? offer.startup.image : "/no_image.jpg"}></img>
                     <div><h3 className="product">{offer.startup.name}</h3>
                        <p>{offer.name}</p></div>
                  </div>
               </div>
            ))}
     
    </div>
  );
}

export default Carousel;
