import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Login from '../login/Login';
import Enviroment from '../../enviroment';
import './HomeNode.css';

function HomeNode() {
  const [accessToken, setAccessToken] = useState();

  return (
    <div className="HomeNode">
      <Navbar />

      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default HomeNode;
