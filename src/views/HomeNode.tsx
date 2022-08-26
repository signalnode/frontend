import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';

import './HomeNode.css';
import { useEffect } from 'react';
import { renewTokens } from '../requests/authentication';

function HomeNode() {
  const navigate = useNavigate();

  useEffect(() => {
    const validateAuthentication = async () => {
      try {
        await renewTokens();
      } catch (err) {
        navigate('/login');
      }
    };

    validateAuthentication();
  }, []);

  return (
    // <AuthenticationContext.Provider value={{ accessToken, refreshToken, authenticated: false }}>
    <div className="HomeNode">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
    // </AuthenticationContext.Provider>
  );
}

export default HomeNode;
