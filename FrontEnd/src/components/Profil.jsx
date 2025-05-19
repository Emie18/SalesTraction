import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/registerpage.css";
import { getStudentDetails } from '../scripts/getData';


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
        <div className='Profil'>
            <p>profil</p>
            {student &&
            <div>
            <h1>{student.name}</h1>
            <h2>{student.surname}</h2>
            <p>{student.description}</p>
            <p>📍 {student.region}</p>
            <p>spoken languages : {student.languages}</p>
            <p>School : {student.school}</p>
            <p>disponibility : {student.disponibility}</p>
            <p>linkedin : {student.linkedin}</p>
            <p>sector : {student.sector}</p>
            <p>{student.email}</p>
            </div>}
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profil;
