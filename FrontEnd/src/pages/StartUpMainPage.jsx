
import { useState } from "react"
import Header from "../components/Header"
import ProfilS from "../components/ProfilS"
import Navigation2 from "../components/Navigation2"
import StartupOffer from "../components/StartupOffer"
import Tinder from "../components/Tinder"
function StartUpMainPage() {
const [page, setPage] = useState(1)
    const renderContent = () => {
    switch (page) {
      case 1:
        return <div>
          <Header />
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