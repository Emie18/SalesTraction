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

      try {
        const res = await fetch('/api/startup/register', {
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
    <div className='register'>
      <h1>{isStudent ? 'Student Registration' : 'Startup Registration'}</h1>

      <form onSubmit={handleSubmit}>
        {isStudent ? (
          <>
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />

            <label>Surname:</label>
            <input name="surname" value={formData.surname} onChange={handleChange} required />

            <label>Email:</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />

            <label>School:</label>
            <input name="school" value={formData.school} onChange={handleChange} />

            <label>Region / Department:</label>
            <input name="region" value={formData.region} onChange={handleChange}  />

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

            <label>LinkedIn Link:</label>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} />

            <label>Image (optional):</label>
            <input name="image" type="file" onChange={handleChange} />

            <label>Description (optional):</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />

            <label>Availability:</label>
            <input name="disponibility" value={formData.disponibility} onChange={handleChange} required />
          </>
        ) : (
          <>
            <label>Startup Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />

            <label>SIRET:</label>
            <input name="siret" value={formData.siret} onChange={handleChange} required />

            <label>LinkedIn Link (optional):</label>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} />

            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />

            <label>Image (optional):</label>
            <input name="image" type="file" onChange={handleChange} />
          </>
        )}

        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />

        <label>Confirm Password:</label>
        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />

        <div className="condition">
          <input name="generaleCondition" type="checkbox" required />
          <p>I accept the general conditions of use</p>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
