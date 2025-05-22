import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/registerpage.css";
import { getStartUpDetails, getOffers_for_Startup } from '../scripts/getData';
import '../styles/profil.css'
import Karousel from './Karousel';
import { API } from '../scripts/api';

function ViewStartup({ id }) {

    const [startup, setStartup] = useState(null);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        API.get(`/startup/get?id=${id}`)
            .then(res => res.json())
            .then(data => { setStartup(data) })
        const fetchstartup = async () => {
            const dataoffer = await getOffers_for_Startup({ id });
            if (dataoffer) setOffers(dataoffer);
            console.log(dataoffer);
        };
        fetchstartup();
    }, [id]);

    return (
        <div className='profil_view'>
            {startup &&
                <div className='detail_profil' id='top'>
                    <img className="photo" src={startup.image ? API.make_url(startup.image) : '/no_image.jpg'}></img>
                    <div className="namesurname">
                        <h1>{startup.name}</h1>

                    </div>
                    <div className="line"></div>
                    <div className="detail2">
                        <div className="ens">
                            <div>
                                <img src='/location.svg'></img>
                                <p> {startup.region}</p>
                            </div>
                        </div>

                        <div className="ens">
                            <div>
                                <img src='/sector.svg'></img>
                                <p>
                                    {
                                        startup.sector && startup.sector.length > 0
                                            ? startup.sector.map((item, index) => (
                                                <span key={index} className="sector-item">
                                                    {item}{index < startup.sector.length - 1 ? ', ' : ''}
                                                </span>
                                            ))
                                            : 'No sector'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="ens">
                            <p>Siret : {startup.siret}</p>
                        </div>

                        <p className='description'>{startup.description}</p>
                        <div className="ens space">
                            <div>
                                <img src="/email.svg"></img>
                                <p>{startup.email}</p>
                            </div>
                            <div>
                                <a href='{startup.linkedin}'>
                                    <img src="/linkedin-brands.svg"></img>
                                </a>
                            </div>
                        </div>

                    </div>
                    <h3 className='last_offer'> Latest offers: </h3>
                    <Karousel offers={offers} />

                </div>}
        </div>
    );
}

export default ViewStartup;
