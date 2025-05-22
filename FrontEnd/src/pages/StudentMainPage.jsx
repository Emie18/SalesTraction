import { useState, useEffect } from "react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"
import "../styles/maketplace.css"
import Filter from "../components/Filter"
import { useNavigate } from "react-router-dom"
import { getRegions, getModes, getOffers, getCommissions, getSectors } from "../scripts/getData"
import ContainerOffer from "../components/ContainerOffer"
import Profil from "../components/Profil"
import TinderS from "../components/TinderS"
import ItsAmatch from "../components/ItsAmatch"
function StudentUpMainPage() {
  const [page, setPage] = useState(1)
  const [regions, setRegions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [workMode, setWorkMode] = useState([]);
  const [offers, setOffers] = useState([]);
  const[refesh,setRefresh]= useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRegions();
      setRegions(data);
      const mode = await getModes();
      setWorkMode(mode);
      const sectordata = await getSectors();
      setSectors(sectordata);
      const comi = await getCommissions();
      setCommissions(comi);
      console.log(comi);
      const ee = await getOffers();
      setOffers(ee);
    };
    fetchData();

  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const ee = await getOffers();
      setOffers(ee);
      setRefresh(false);
    };
    fetchData();

  }, [refesh]);

  const navigate = useNavigate();

  // Fonction pour afficher le contenu en fonction de la page active
  const renderContent = () => {
    switch (page) {
      case 1:
        return <div>
          <Header />
        </div>
      case 2:
        return <div>
          <ItsAmatch match={"ee"}/>
          </div>
      case 3:
        return <div>
          <TinderS />
        </div>
      case 4:
        return (
    <div>
      <Header />
      <Filter
        workMode={workMode}
        regions={regions}
        sectors={sectors}
        commissions={commissions}
        onSearch={getOffers}
        setOffers={setOffers}
      />
      <ContainerOffer offers={offers} setRefresh={setRefresh}/>
    </div>
  );
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