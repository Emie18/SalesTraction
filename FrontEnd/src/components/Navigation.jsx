import "../styles/navigation.css"

function Navigation({ page }) {
  // Fonction pour changer la page lorsqu'un élément est cliqué
  const handlePageChange = (pageNumber) => {
    page(pageNumber);
  };

  return (
    <>
      <div className="nav">
        <div className="icon home" onClick={() => handlePageChange(1)}>
          <img src="/home.svg" alt="home_logo"></img>
          <p>Home</p>
        </div>
        <div className="icon messages" onClick={() => handlePageChange(2)}>
          <img src="/message.svg" alt="message_logo"/>
          <p>Messages</p>
        </div>
        <div className="match" onClick={() => handlePageChange(3)}>
          <img src="/match_button_bar.svg" alt="match logo bar"/>
        </div>
        <div className="icon market" onClick={() => handlePageChange(4)}>
          <img src="/maketplace.svg" alt="marketplace logo"/>
          <p>Marketplace</p>
        </div>
        <div className="icon profil" onClick={() => handlePageChange(5)}>
          <img src="/person.svg" alt="profil logo"/>
          <p>Profil</p>
        </div>
      </div>
    </>
  )
}

export default Navigation