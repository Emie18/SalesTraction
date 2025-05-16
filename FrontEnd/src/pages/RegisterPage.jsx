import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import "../styles/registerpage.css";

function RegisterPage() {
  const location = useLocation();
  const isStudent = location.pathname.includes('/student');

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
    language: '',
    sector: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (isStudent) {
      const studentPayload = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        disponibility: formData.disponibility,
        description: formData.description,
        linkedin: formData.linkedin,
        pass: formData.password,
      };
      // Add a new student
      try {
        console.log(JSON.stringify(studentPayload))
        const res = await fetch('http://localhost:3000/students/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentPayload),
        });

        const data = await res.json();
        console.log("Student registered:", data);
      } catch (err) {
        console.error("Error:", err);
      }
    } else {
      const startupPayload = {
        name: formData.name,
        email: formData.email,
        siret: formData.siret,
        linkedin: formData.linkedin,
        description: formData.description,
        pass: formData.password,
      };
      //add a new startup
      try {
        const res = await fetch('http://localhost:3000/startup/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(startupPayload),
        });
        const data = await res.json();
        console.log("Startup registered:", data);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <div className='page center'>
      <div className="title_home">
        <a href='/'>Home</a>
        <h1>SalesTraction</h1>
      </div>
      <div className='register'>
        <h2>{isStudent ? 'Student Registration' : 'Startup Registration'}</h2>

        <form onSubmit={handleSubmit}>
          {isStudent ? (
            <>
              <div>
                <p>Name:</p>
                <input className="long" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <p>Surname:</p>
                <input className="long" name="surname" value={formData.surname} onChange={handleChange} required />
              </div>
              <div><p>Email:</p>
                <input className="long" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>       <p>School:</p>
                <input className="long" name="school" value={formData.school} onChange={handleChange} />
              </div>
              <div>
                <p>Region / Department:</p>
                <input className="long" name="region" value={formData.region} onChange={handleChange} />
              </div>

              <div className="language">
                <label>Language:</label>
                <select name="language" value={formData.language} onChange={handleChange}>
                  <option value="">...</option>
                  <option value="1">French</option>
                  <option value="2">Spanish</option>
                  <option value="3">English</option>
                </select>
                <button type="button">+</button>
              </div>

              <div className="sector">
                <label>Sector:</label>
                <select name="sector" value={formData.sector} onChange={handleChange}>
                  <option value="">...</option>
                  <option value="1">Digital</option>
                  <option value="2">Agroalimentaire</option>
                </select>
                <button type="button">+</button>
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
                <p>Description (optional):</p>
                <textarea className="long" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div><p>Availability:</p>
                <input className="long" name="disponibility" value={formData.disponibility} onChange={handleChange} required />
              </div>
            </>
          ) : (
            <>
              <div>
                <p>Startup Name:</p>
                <input className="long" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <p>Email:</p>
                <input className="long" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <p>SIRET:</p>
                <input className="long" name="siret" value={formData.siret} onChange={handleChange} required />
              </div>
              <div>
                <p>LinkedIn Link (optional):</p>
                <input className="long" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>
              <div>
                <p>Description:</p>
                <textarea className="long" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div>
                <p>Image (optional):</p>
                <input className="long" name="image" type="file" onChange={handleChange} />
              </div>

            </>
          )}
          <div>
            <p>Password:</p>
            <input className="long" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <p>Confirm Password:</p>
            <input className="long" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="condition">
            <input  name="generaleCondition" type="checkbox" required />
            <p>I accept the general conditions of use</p>
          </div>

          <button  className="send" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
