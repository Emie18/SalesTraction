import "../styles/navigation.css"

function Navigation2({ page, currentPage }) {
  // Fonction pour changer la page lorsqu'un élément est cliqué
  const handlePageChange = (pageNumber) => {
    page(pageNumber);
  };

  return (
    <>
      <div className="nav">
        <div className="icon home" onClick={() => handlePageChange(1)}>
          <img className={currentPage === 1 ? "open" : ""} src="/home.svg" alt="home_logo"></img>
          <p className={currentPage === 1 ? "open" : ""} >Home</p>
        </div>
        <div className="icon messages">
          <img  className={currentPage === 2 ? "" : ""} src="/message.svg" alt="message_logo"/>
          <p className={currentPage === 2 ? "" : ""}>Messages</p>
        </div>
        <div className="match" onClick={() => handlePageChange(3)}>
          <img src="/match_button_bar.svg" alt="match logo bar"/>
        </div>
        <div className="icon offer" onClick={() => handlePageChange(4)}>
          <img className={currentPage === 4 ? "open" : ""} src="/offer.svg" alt="offer logo"/>
          <p className={currentPage === 4 ? "open" : ""} >Offers</p>
        </div>
        <div className="icon profil" onClick={() => handlePageChange(5)}>
          <img className={currentPage === 5 ? "open" : ""} src="/person.svg" alt="profil logo"/>
          <p className={currentPage === 5 ? "open" : ""} >Profil</p>
        </div>
      </div>
    </>
  )
}

export default Navigation2