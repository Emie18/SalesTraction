import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../styles/registerpage.css";
import { getRegions, getLanguages, getSchools, getSectors } from '../scripts/getData';

function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isStudent = location.pathname.includes('/student');
  const [regions, setRegions] = useState([]);
  const [schools, setSchools] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [currentSector, setCurrentSector] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRegions();
      setRegions(data);
      const schools = await getSchools();
      setSchools(schools);
      const languagesData = await getLanguages();
      setLanguages(languagesData);
      if (languagesData.length > 0) {
        setCurrentLanguage(languagesData[0]);
      }
      const sectorData = await getSectors();
      setSectors(sectorData);
      if (sectorData.length > 0) {
        setCurrentSector(sectorData[0]);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    region: '',
    linkedin: '',
    image: null,
    description: '',
    disponibility: '',
    password: '',
    confirmPassword: '',
    siret: '',
    school: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "language") {
      setCurrentLanguage(value);
    } else if (name === "sector") {
      setCurrentSector(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'file' ? files[0] : value,
      }));
    }
  };

  const addLanguage = () => {
    if (currentLanguage && !selectedLanguages.includes(currentLanguage)) {
      setSelectedLanguages([...selectedLanguages, currentLanguage]);
    }
  };

  const removeLanguage = (languageToRemove) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang !== languageToRemove));
  };

  const addSector = () => {
    if (currentSector && !selectedSectors.includes(currentSector)) {
      setSelectedSectors([...selectedSectors, currentSector]);
    }
  };

  const removeSector = (sectorToRemove) => {
    setSelectedSectors(selectedSectors.filter(sect => sect !== sectorToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (isStudent) {
      const studentPayload = new FormData();

      // Append all fields
      studentPayload.append('name', formData.name);
      studentPayload.append('surname', formData.surname);
      studentPayload.append('email', formData.email);
      studentPayload.append('disponibility', formData.disponibility);
      studentPayload.append('description', formData.description);
      studentPayload.append('linkedin', formData.linkedin);
      studentPayload.append('pass', formData.password);
      studentPayload.append('school', formData.school);
      studentPayload.append('region', formData.region);
      studentPayload.append('image', formData.image);

      // Append arrays
      selectedLanguages.forEach(lang => { studentPayload.append('languages[]', lang); });
      selectedSectors.forEach(sector => { studentPayload.append('sector[]', sector); });

      // Add a new student
      try {
        const res = await fetch('http://localhost:3000/students/create', {
          method: 'POST',
          body: studentPayload, // no headers here, fetch handles it
        });
      
        const data = await res.json();
        console.log("Student registered:", data);
        setRegistrationSuccess(true);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      const startupPayload = new FormData();

      // Append all fields
      startupPayload.append('name', formData.name);
      startupPayload.append('email', formData.email);
      startupPayload.append('siret', formData.siret);
      startupPayload.append('linkedin', formData.linkedin);
      startupPayload.append('region', formData.region);
      startupPayload.append('description', formData.description);
      startupPayload.append('pass', formData.password);
      startupPayload.append('image', formData.image);

      // Append array values (e.g. selectedSectors)
      selectedSectors.forEach(sector => {
        startupPayload.append('sector[]', sector);
      });

      // Submit the form
      try {
        const res = await fetch('http://localhost:3000/startup/create', {
          method: 'POST',
          body: startupPayload, // no headers, fetch will set content-type for FormData
        });

        const data = await res.json();
        console.log("Startup registered:", data);
        setRegistrationSuccess(true);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <div className='page center'>
      <div className="title_home">
        <img src='/logoSsans_bg.png'></img>
        <h1>SalesTraction</h1>
        <a href='/'>Home</a>
      </div>
      <div className='register'>
        <h2>{isStudent ? 'Student Registration' : 'Startup Registration'}</h2>

        {registrationSuccess ? (
          <div className="success-message">
            <h3>Registration Successful!</h3>
            {isStudent ? (
              <p>Your student account has been created successfully. You can now log in to access all features.</p>
            ) : (
              <p>Your startup account has been created successfully. Please wait until an administrator verifies your account. This process usually takes less than 24 hours on average.</p>
            )}
            <button
              className="login-button"
              onClick={() => navigate('/login')}
            >
              Go to Login Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p>Fields with * are required</p>
            {isStudent ? (
              <>
                <div>
                  <p>Name:*</p>
                  <input className="long" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <p>Surname:*</p>
                  <input className="long" name="surname" value={formData.surname} onChange={handleChange} required />
                </div>
                <div><p>Email:*</p>
                  <input className="long" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <p>School:</p>
                  <select name="school" value={formData.school} onChange={handleChange} >
                    <option value="">Select a school</option>
                    {schools.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Region:*</p>
                  <select className="long" name="region" value={formData.region} onChange={handleChange} required>
                    <option value="">Select a region</option>
                    {regions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="language-section">
                  <label>Languages:*</label>
                  <div className="language-selector">
                    <select name="language" value={currentLanguage} onChange={handleChange}>
                      {languages.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button className='add' type="button" onClick={addLanguage}>+</button>
                  </div>

                  {selectedLanguages.length > 0 && (
                    <div className="selected-languages">
                      <p>Selected languages:</p>
                      <ul>
                        {selectedLanguages.map(lang => (
                          <li key={lang}>
                            {lang}
                            <button className='add' type="button" onClick={() => removeLanguage(lang)}>-</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="sector-section">
                  <label>Sectors:*</label>
                  <div className="sector-selector">
                    <select name="sector" value={currentSector} onChange={handleChange}>
                      {sectors.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button className='add' type="button" onClick={addSector}>+</button>
                  </div>

                  {selectedSectors.length > 0 && (
                    <div className="selected-sectors">
                      <p>Selected sectors:</p>
                      <ul>
                        {selectedSectors.map(sector => (
                          <li key={sector}>
                            {sector}
                            <button className='add' type="button" onClick={() => removeSector(sector)}>-</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <p>LinkedIn Link:</p>
                  <input className="long" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                </div>
                <div>
                  <p>Image (optional):</p>
                  <input className="long" name="image" type="file" onChange={handleChange} />
                </div>
                <div>
                  <p>Description:*</p>
                  <textarea className="long description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                  <p>Availability:*</p>
                  <input className="long" name="disponibility" value={formData.disponibility} onChange={handleChange} required />
                </div>
              </>
            ) : (
              <>
                <div>
                  <p>Startup Name:*</p>
                  <input className="long" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <p>Email:*</p>
                  <input className="long" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <p>SIRET:*</p>
                  <input className="long" name="siret" value={formData.siret} onChange={handleChange} required />
                </div>
                <div>
                  <p>Region:*</p>
                  <select className="long" name="region" value={formData.region} onChange={handleChange} required>
                    <option value="">Select a region</option>
                    {regions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="sector-section">
                  <label>Sectors:*</label>
                  <div className="sector-selector">
                    <select name="sector" value={currentSector} onChange={handleChange}>
                      {sectors.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button className='add' type="button" onClick={addSector}>+</button>
                  </div>

                  {selectedSectors.length > 0 && (
                    <div className="selected-sectors">
                      <p>Selected sectors:</p>
                      <ul>
                        {selectedSectors.map(sector => (
                          <li key={sector}>
                            {sector}
                            <button type="button" onClick={() => removeSector(sector)}>-</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <p>LinkedIn Link (optional):</p>
                  <input className="long" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                </div>
                <div>
                  <p>Description:*</p>
                  <textarea className="long description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                  <p>Image (optional):</p>
                  <input className="long" name="image" type="file" onChange={handleChange} />
                </div>
              </>
            )}
            <div>
              <p>Password:*</p>
              <input className="long" name="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <p>Confirm Password:*</p>
              <input className="long" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="condition">
              <input name="generaleCondition" type="checkbox" required />
              <p>I accept the general conditions of use *</p>
            </div>

            <button className="send" type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;