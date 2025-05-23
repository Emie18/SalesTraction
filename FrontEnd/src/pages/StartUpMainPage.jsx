
import { useState } from "react"
import Header from "../components/Header"
import ProfilS from "../components/ProfilS"
import Navigation2 from "../components/Navigation2"
import StartupOffer from "../components/StartupOffer"
import Tinder from "../components/Tinder"
function StartUpMainPage() {
const [page, setPage] = useState(localStorage.getItem('page')?parseInt(localStorage.getItem('page')):1)
    const renderContent = () => {
    switch (page) {
      case 1:
        return <div>
          <Header />
          <div className="homelogotext">
            <img src="/logoSsans_bg.png"></img>
            <h2>Welcome to Salestraction!</h2>

            <p>You’ve just joined a network of ambitious students ready to help your startup grow.
On this platform, you can connect with motivated business students looking to gain real-world experience by supporting you in selling your product or service.  </p>
            <p>
              Browse through student profiles, match with candidates who align with your vision, and build your dream sales team : one swipe at a time.
Let’s accelerate your traction together! </p>
          </div>
        </div>
      case 2:
        return <div>Page 2: Messages</div>
      case 3:
        return <div>
          <Tinder />
        </div>
      case 4:
        return <div>
          <Header />
          <StartupOffer />
        </div>
      case 5:
        return <div>
      <ProfilS />
        </div>
      default:
        return <div>Page 1: Home</div>
    }
  }

  return (
    <>
      <div className="page">
        <main className="content">
          {renderContent()}
        </main>
        <Navigation2 page={setPage} currentPage={page} />
      </div>
    </>
  )
  }

 export default StartUpMainPage