import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';

import './HomeNode.css';
import { useReducer } from 'react';
import AuthenticationReducer from '../authentication/AuthenticationReducer';
import AuthenticationContext from '../authentication/AuthenticationContext';
import AuthenticationState from '../authentication/AuthenticationState';

function HomeNode() {
  const [authState, dispatch] = useReducer(AuthenticationReducer, { accessToken: undefined, refreshToken: undefined, authenticated: false });

  return (
    <AuthenticationContext.Provider value={authState}>
      <div className="HomeNode">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </AuthenticationContext.Provider>
  );
}

export default HomeNode;
