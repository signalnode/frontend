import Enviroment from '../enviroment';
import { loadSettings, saveSettings } from '../token_helper';
import { renewTokens, TokenResponse } from './authentication';

export type Addon = {
  id: number;
  name: string;
  version: string;
};

type AddonResponse = {
  addons: Addon[];
};

export const fetchAddons = async (): Promise<Addon[]> => {
  const { accessToken, refreshToken } = loadSettings();

  console.log('Fetching Addons...');
  console.log(`Current Access Token: ${accessToken}`);
  console.log(`Current Refresh Token: ${refreshToken}`);
  console.log('-------------------------------------');

  let res = await fetch(`${Enviroment.BACKEND_URL}/addons`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } });

  console.log('Addons fetched...');
  console.log(`Response Status: ${res.status}`);
  console.log('-------------------------------------');

  if (res.status !== 200) {
    await renewTokens();

    return await fetchAddons();
  }

  console.log('Parse response...');

  const data = (await res.json()) as AddonResponse & TokenResponse;
  if (data && data.accessToken && data.refreshToken) {
    console.log(`New Access Token: ${data.accessToken}`);
    console.log(`New Refresh Token: ${data.refreshToken}`);

    saveSettings({ accessToken: data.accessToken, refreshToken: data.refreshToken });
  }

  return data.addons;
};
