import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/registerpage.css";

import { API } from '../scripts/api';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session) {
      if (session.type === 'student') {
        navigate('/student/home');
      } else if (session.type === 'startup') {
        navigate('/startup/home');
      } else if (session.type === 'admin') {
        navigate('/admin');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await API.post('/account/login', JSON.stringify({ email: email, pass: password }), {
        headers: {'Content-Type': 'application/json'}
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      localStorage.setItem('session', JSON.stringify(data));
      localStorage.setItem('access_token', data.token);

      switch (data.type) {
        case 'student':
          navigate('/student/home');
          break;
        case 'startup':
          navigate('/startup/home');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          setError('Unknown user type');
      }

    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='page center'>
      <div className="title_home">
         <img src='/logoSsans_bg.png'></img>
        <h1>SalesTraction</h1>
        <a href='/'>Home</a>
      </div>
      <div className="login">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <p>Email :</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <p>Password :</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
