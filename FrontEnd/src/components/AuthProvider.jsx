import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // current time in seconds

      if (decoded.exp < now) {
        // Token is already expired
        handleLogout();
      } else {
        // Set a timeout to log out when the token expires
        const timeout = setTimeout(() => {
          handleLogout();
        }, (decoded.exp - now) * 1000);

        return () => clearTimeout(timeout); // Clean up on unmount
      }
    } catch (err) {
      console.error('Invalid token:', err);
      handleLogout();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // You can also remove other user data if stored
    navigate('/login'); // or your login route
  };
}