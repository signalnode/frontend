import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Enviroment from '../enviroment';
import './HomeNode.css';

function HomeNode() {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const authenticate = async () => {
      const res = await fetch(`${Enviroment.SERVER_URL}/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'dev', password: 'dev' }),
      });
      const data = await res.json();

      return data;
    };

    authenticate();
  }, []);

  return (
    <div className="HomeNode">
      <Navbar />
    </div>
  );
}

export default HomeNode;
