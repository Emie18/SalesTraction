import "../styles/navigation.css"
function Navigation() {

    return (
      <>
        <div className="nav">
          <div className="icon home">
            <img src="/home.svg" alt="home_logo"></img>
            <p>Home</p>
          </div>
          <div className="icon messages">
            <img src="/message.svg" alt="message_logo"/>
            <p>Messages</p>
          </div>
          <div className="match">
            <img src="/match_button_bar.svg" alt="match logo bar"/>
          </div>
          <div className="icon market">
            <img src="/maketplace.svg" alt="marketplace logo"/>
            <p>Marketplace</p>
          </div>
          <div className="icon profil">
            <img src="/person.svg" alt="profil logo"/>
            <p>Profil</p>
          </div>
         </div>
      </>
    )
  }

 export default Navigation

 