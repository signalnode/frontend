import Enviroment from '../env';

export const getAccessToken = () => localStorage.getItem('SIGNALNODE_ACCESS_TOKEN') || undefined;

export const getRefreshToken = () => localStorage.getItem('SIGNALNODE_REFRESH_TOKEN') || undefined;

export const storeAccessToken = (token: string) => localStorage.setItem('SIGNALNODE_ACCESS_TOKEN', token);

export const storeRefreshToken = (token: string) => localStorage.setItem('SIGNALNODE_REFRESH_TOKEN', token);

export const removeAccessToken = () => localStorage.removeItem('SIGNALNODE_ACCESS_TOKEN');

export const removeRefreshToken = () => localStorage.removeItem('SIGNALNODE_REFRESH_TOKEN');

export const validateToken = async (token: string) => {
  const res = await fetch(`${Enviroment.BACKEND_URL}/token/validate?token=${token}`, { method: 'GET' });
  return res.status === 200;
};

type SignalNodeSettings = {
  accessToken?: string | null;
  refreshToken?: string | null;
};

export const saveSettings = (settings: SignalNodeSettings) => {
  const _settings = Object.entries(settings).reduce((acc, [key, value]) => {
    return key && value ? { ...acc, [key]: value } : acc;
  }, {});
  if (Object.keys(_settings).length) {
    localStorage.setItem('SIGNALNODE_SETTINGS', JSON.stringify(_settings));
  }
};

export const loadSettings = () => {
  const settings = localStorage.getItem('SIGNALNODE_SETTINGS');

  if (!settings) return { accessToken: undefined, refreshToken: undefined };

  return JSON.parse(settings) as SignalNodeSettings;
};

export const clearSettings = () => {
  localStorage.removeItem('SIGNALNODE_SETTINGS');
};
