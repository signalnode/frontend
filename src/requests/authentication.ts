import Enviroment from '../env';
import { clearSettings, loadSettings, saveSettings } from '../utils/token-helper';

export type TokenResponse = { accessToken: string; refreshToken: string } | undefined;

const headers: HeadersInit = { 'Content-Type': 'application/json' };

export const renewTokens = async () => {
  const { refreshToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/renew`, { method: 'GET', headers: { authorization: `Bearer ${refreshToken}` } });

  if (res.status !== 200) throw new Error();

  const data = await res.json();
  saveSettings({ accessToken: data.accessToken, refreshToken: data.refreshToken });
};

export const login = async (username: string, passphrase: string): Promise<void> => {
  const body = { username, passphrase };
  const res = await fetch(`${Enviroment.BACKEND_URL}/authenticate`, { method: 'POST', headers, body: JSON.stringify(body) });

  if (res.status !== 200) throw new Error();

  const { accessToken, refreshToken } = await res.json();
  saveSettings({ accessToken, refreshToken });
};

export const logout = async (): Promise<void> => {
  clearSettings();
  const { refreshToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/logout`, { method: 'GET', headers: { authorization: `Bearer ${refreshToken}` } });

  if (res.status !== 200) throw new Error();
};
