import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRegions, getCommissions, getModes } from '../scripts/getData';

function NewOffer({ onSubmitSuccess }) {
    const navigate = useNavigate();
    const [me, setMe] = useState(localStorage.getItem('session'));

    const [name, setName] = useState('');
    const [product, setProduct] = useState('');
    const [range, setRange] = useState('');
    const [pitch, setPitch] = useState('');
    const [commission, setCommission] = useState('');
    const [region, setRegion] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [client, setClient] = useState('');
    const [error, setError] = useState('');

    const [regions, setRegions] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [workModes, setWorkModes] = useState([]);

    useEffect(() => {
        const sessionData = localStorage.getItem('session');
        if (sessionData) {
            try {
                const parsed = JSON.parse(sessionData);
                setMe(parsed);
                console.log("Session user data:", parsed);
            } catch (e) {
                console.error("Session parsing error", e);
                setMe(null);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const regionsData = await getRegions();
                const commissionsData = await getCommissions();
                const modesData = await getModes();

                setRegions(regionsData);
                setCommissions(commissionsData);
                setWorkModes(modesData);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
                setError("Impossible de charger les données nécessaires");
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!me || !me.id) {
            setError('Erreur: ID de startup non disponible. Veuillez vous reconnecter.');
            return;
        }

        try {
            const offerData = {
                name,
                product,
                pitch,
                range: range,
                client,
                commission,
                startup: me.id,
                region,
                work_mode: workMode
            };

            console.log("Données à envoyer:", offerData);

            const response = await fetch('http://localhost:3000/offer/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(offerData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error("Réponse d'erreur:", errorData);
                throw new Error(errorData?.message || "Échec de création de l'offre");
            }

            if (onSubmitSuccess) {
                onSubmitSuccess();
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            console.error(err);
            setError("Échec de création de l'offre. Veuillez vérifier les informations fournies.");
        }
    };

    if (!me) {
        return (
            <div className="page center">
                <div className="login">
                    <div className="error-message">
                        <p>Vous devez être connecté pour créer une offre.</p>
                        <button onClick={() => navigate('/login')}>Se connecter</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div >
            <div className="New_offer">
                <h2>New offer</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Name:</p>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div>
                        <p>Product :</p>
                        <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} required />
                    </div>

                    <div>
                        <p>Range :</p>
                        <input type="text" value={range} onChange={(e) => setRange(e.target.value)} required />
                    </div>

                    <div>
                        <p>Client :</p>
                        <input type="text" value={client} onChange={(e) => setClient(e.target.value)} required />
                    </div>

                    <div>
                        <p>Pitch :</p>
                        <textarea className='text_pitch' value={pitch} onChange={(e) => setPitch(e.target.value)} required rows="4" />
                    </div>

                    <div>
                        <p>Commission :</p>
                        <select value={commission} onChange={(e) => setCommission(e.target.value)} required>
                            <option value="">Select a commission</option>
                            {commissions.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p>Region :</p>
                        <select value={region} onChange={(e) => setRegion(e.target.value)} required>
                            <option value="">Select a region</option>
                            {regions.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p>Work mode :</p>
                        <select value={workMode} onChange={(e) => setWorkMode(e.target.value)} required>
                            <option value="">Select a work mode</option>
                            {workModes.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="error">{error}</p>}
                    <div className='button_create'>
                        <button type="submit">Create</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default NewOffer;
