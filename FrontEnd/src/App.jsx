// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MatchPage from './pages/MatchPage';
import StudentMainPage from './pages/StudentMainPage';
import StartUpMainPage from './pages/StartUpMainPage';
import ProtectedRedirect from './components/ProtectedRedirect';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRedirect>
          <HomePage />
        </ProtectedRedirect>
      } />
      <Route path="/login" element={
        <ProtectedRedirect>
          <LoginPage />
        </ProtectedRedirect>
      } />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/student/register" element={<ProtectedRedirect><RegisterPage /></ProtectedRedirect>} />
      <Route path="/startup/register" element={ <ProtectedRedirect><RegisterPage /></ProtectedRedirect>} />
      <Route path="/match" element={<MatchPage />} />
      <Route path="/student/home" element={<ProtectedRedirect><StudentMainPage /></ProtectedRedirect>} />
      <Route path="/startup/home" element={<ProtectedRedirect><StartUpMainPage /></ProtectedRedirect>} />
    </Routes>
  );
}

export default App;
