import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import "../styles/registerpage.css"
function RegisterPage() {
  const location = useLocation();
  const isStudent = location.pathname.includes('/student');

  // Common states (could be split per form if needed)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    region: '',
    linkedin: '',
    image: '',
    description: '',
    disponibility: '',
    password: '',
    confirmPassword: '',
    siret: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission (e.g., send to API)
    console.log('Form data:', formData);
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
            <input name="school" type="text" value={formData.school} onChange={handleChange} required />

            <label>Region / Department:</label>
            <input name="region" value={formData.region} onChange={handleChange} required />
            <div className="language">
            <label>Language:</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option value={1}>French</option>
              <option value={2}>Spanish</option>
              <option value={3}>English</option>
              <option  selected disabled hidden value={0}>...</option>
              </select>
              <button>+</button>
              </div>

              <div className="sector">
            <label>Sector:</label>
            <select name="language" value={formData.sector} onChange={handleChange}>
              <option value={1}>Digital</option>
              <option value={2}>Agroalimentaire</option>
              <option  selected disabled hidden value={0}>...</option>
              </select>
              <button>+</button>
              </div>
            <label>LinkedIn Link:</label>
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} />

            <label>Image (optional):</label>
            <input name="image" type="file" value={formData.image} onChange={handleChange} />

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
            <input name="image" type="file" value={formData.image} onChange={handleChange} />
          </>
        )}

        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />

        <label>Confirm Password:</label>
        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
        <div className="condition">
        <input name="generaleCondition" type="checkbox"></input>
                <p>I accept the general conditions of use</p>
        </div>
  
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
