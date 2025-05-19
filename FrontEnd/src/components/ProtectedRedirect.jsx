// src/components/ProtectedRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRedirect({ children }) {
  const navigate = useNavigate();

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

  return children;
}

export default ProtectedRedirect;
