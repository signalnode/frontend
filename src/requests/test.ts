import Enviroment from '../env';
import { loadSettings } from '../utils/token-helper';
import { renewTokens } from './authentication';

type User = {
  username: string;
  password: string;
  token: string;
};

export const test = async (): Promise<User> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/users/1`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } });

  if (res.status !== 200) {
    await renewTokens();
    // if (!success) throw new Error();

    return await test();
  }

  const data = await res.json();
  // saveSettings({ accessToken: data.accessToken, refreshToken: data.refreshToken });

  return data;
};
