import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/registerpage.css";
import { getStudentDetails } from '../scripts/getData';
import '../styles/profil.css'

function Profil() {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    const logout = () => {
        if (window.confirm("Voulez-vous vous déconnecter ?")) {
            localStorage.removeItem('session');
            navigate('/');
        }
    };

    useEffect(() => {
        const fetchStudent = async () => {
            const data = await getStudentDetails();
            if (data) setStudent(data);
            console.log(data);

        };
        fetchStudent();
    }, []);

    return (
        <div className='profil_view'>
            {student &&
                <div className='detail_profil'>
                    <img className="photo" src={student.image? student.image : '/no_image2.png'}></img>
                    <div className="namesurname">
                        <h1>{student.name} {student.surname}</h1>
                        
                    </div>
                    <div className="detail2">
                        <div className="ens">
                            <div>
                                <img src='/location.svg'></img>
                                <p> {student.region}</p>
                            </div>
                            <div>
                                <img src='/school.svg'></img>
                                <p>{student.school}</p>
                            </div>
                        </div>

                        <div className="ens">
                            <div>
                                <img src='/sector.svg'></img>
                                <p>
                                    {
                                        student.sector && student.sector.length > 0
                                            ? student.sector.map((item, index) => (
                                                <span key={index} className="sector-item">
                                                    {item}{index < student.sector.length - 1 ? ', ' : ''}
                                                </span>
                                            ))
                                            : 'No sector'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="ens">
                            <div>
                                <img src='/spoken.svg'></img>
                                <p>
                                    {
                                        student.languages && student.languages.length > 0
                                            ? student.languages.map((lang, index) => (
                                                <span key={index} className="language-item">
                                                    {lang}{index < student.languages.length - 1 ? ', ' : ''}
                                                </span>
                                            ))
                                            : 'No language'
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="ens">
                            <div>
                                <img src='/dispo.svg'></img>
                                <p>{student.disponibility}</p>
                            </div>
                        </div>



                        <p className='description'>{student.description}</p>
                        <div className="ens space">
                            <div>
                                <img src="/email.svg"></img>
                                <p>{student.email}</p>
                            </div>
                            <div>
                                <a href='{student.linkedin}'>
                                <img src="/linkedin-brands.svg"></img>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>}
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profil;
