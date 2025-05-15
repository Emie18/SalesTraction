// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from'./pages/AdminPage'
import LoginPage from'./pages/LoginPage'
import RegisterPage from'./pages/RegisterPage'
import MatchPage from'./pages/MatchPage'
import StudentMainPage from'./pages/StudentMainPage'
import StartUpMainPage from'./pages/StartUpMainPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/match" element={<MatchPage />} />
      <Route path="/student/home" element={<StudentMainPage />} />
      <Route path="/startup/home" element={<StartUpMainPage />} />
    </Routes>
  );
}

export default App;
