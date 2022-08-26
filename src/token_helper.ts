import Enviroment from './enviroment';

export const getAccessToken = () => localStorage.getItem('HOMENODE_ACCESS_TOKEN') || undefined;

export const getRefreshToken = () => localStorage.getItem('HOMENODE_REFRESH_TOKEN') || undefined;

export const storeAccessToken = (token: string) => localStorage.setItem('HOMENODE_ACCESS_TOKEN', token);

export const storeRefreshToken = (token: string) => localStorage.setItem('HOMENODE_REFRESH_TOKEN', token);

export const removeAccessToken = () => localStorage.removeItem('HOMENODE_ACCESS_TOKEN');

export const removeRefreshToken = () => localStorage.removeItem('HOMENODE_REFRESH_TOKEN');

export const validateToken = async (token: string) => {
  const res = await fetch(`${Enviroment.BACKEND_URL}/token/validate?token=${token}`, { method: 'GET' });
  return res.status === 200;
};

type HomenodeSettings = {
  accessToken?: string;
  refreshToken?: string;
};

export const saveSettings = (settings: HomenodeSettings) => {
  localStorage.setItem('HOMENODE_SETTINGS', JSON.stringify(settings));
};

export const loadSettings = () => {
  const settings = localStorage.getItem('HOMENODE_SETTINGS');

  if (!settings) return { accessToken: undefined, refreshToken: undefined };

  return JSON.parse(settings) as HomenodeSettings;
};

export const clearSettings = () => {
  localStorage.removeItem('HOMENODE_SETTINGS');
};
