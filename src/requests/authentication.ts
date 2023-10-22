import Enviroment from '../env';
import { clearSettings, loadSettings, saveSettings } from '../utils/token-helper';

export type TokenResponse = { accessToken: string; refreshToken: string } | undefined;

const headers: HeadersInit = { 'Content-Type': 'application/json' };

export const login = async (username: string, passphrase: string): Promise<void> => {
  const body = { username, passphrase };
  const res = await fetch(`${Enviroment.BACKEND_URL}/authenticate`, { method: 'POST', headers, body: JSON.stringify(body), credentials: 'include' });

  if (res.status !== 204) throw new Error();

  saveSettings({ accessToken: res.headers.get('authorization') });
};

// export const renewTokens = async () => {
//   const { refreshToken } = loadSettings();
//   const res = await fetch(`${Enviroment.BACKEND_URL}/renew`, { method: 'GET', headers: { authorization: `Bearer ${refreshToken}`, credentials: 'include' } });

//   if (res.status !== 204) throw new Error();

//   saveSettings({ accessToken: res.headers.get('authorization')! });
// };

export const logout = async (): Promise<void> => {
  try {
    const { accessToken } = loadSettings();
    await fetch(`${Enviroment.BACKEND_URL}/logout`, {
      method: 'GET',
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
  } finally {
    clearSettings();
  }
};
