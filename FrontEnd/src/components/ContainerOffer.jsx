function ContainerOffer({ offers }) {
   console.log(offers);
   return (
      <div className="container_offer">
         {offers.map((offer) => (
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
                  <div> <img src="/person.svg"></img><p>{offer.client}</p></div>
                  <div> <img src="/sector.svg"></img><p>{offer.startup.sector.join(", ")}</p></div>
                  <div> <img src="/location.svg"></img><p>{offer.startup.region}</p></div>
                  <div> <img src="/home_work.svg"></img><p>{offer.work_mode}</p></div>
                  <div> <img src="/commission.svg" alt="commision" /><p>{offer.commission}</p></div>
               </div>
               <div className="postule">
                  <button>Apply</button>
               </div>


            </div>
         ))}
      </div>
   );
}
export default ContainerOffer;
