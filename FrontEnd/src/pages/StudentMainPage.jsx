import { useState, useEffect } from "react"
import Navigation from "../components/Navigation"
import Header from "../components/header"
import "../styles/maketplace.css"
import Filter from "../components/Filter"
import { useNavigate } from "react-router-dom"
import { getRegions, getModes } from "../scripts/getData"
import ContainerOffer from "../components/ContainerOffer"
import Profil from "../components/Profil"
function StudentUpMainPage() {
  const [page, setPage] = useState(1)
  const [regions, setRegions] = useState([]);
  const [workMode, setWorkMode] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRegions();
      setRegions(data);
      const mode = await getModes();
      setWorkMode(mode);
    };
    fetchData();

  }, []);
  const navigate = useNavigate();

  // Fonction pour afficher le contenu en fonction de la page active
  const renderContent = () => {
    switch (page) {
      case 1:
        return <div>
          <Header />
        </div>
      case 2:
        return <div>Page 2: Messages</div>
      case 3:
        return <div>Page 3: Match</div>
      case 4:
        return <div>
          <Header />
          <Filter workMode={workMode} regions={regions} />
          <ContainerOffer />
        </div>
      case 5:
        return <div>
          <Profil />
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
        <Navigation page={setPage} currentPage={page} />
      </div>
    </>
  )
}

export default StudentUpMainPage