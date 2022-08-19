import Enviroment from './enviroment';

export const getAccessToken = () => localStorage.getItem('HOMENODE_ACCESS_TOKEN');

export const getRefreshToken = () => localStorage.getItem('HOMENODE_REFRESH_TOKEN');

export const setAccessToken = (token: string) => localStorage.setItem('HOMENODE_ACCESS_TOKEN', token);

export const setRefreshToken = (token: string) => localStorage.setItem('HOMENODE_REFRESH_TOKEN', token);

export const validateToken = async (token: string) => {
  const res = await fetch(`${Enviroment.BACKEND_URL}/token/validate?token=${token}`, { method: 'GET' });
  return res.status === 200;
};
