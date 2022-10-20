import Enviroment from '../enviroment';
import { loadSettings } from '../token_helper';
import { renewTokens } from './authentication';

export type StoreAddon = {
  uuid: string;
  name: string;
  description: string;
  version: string;
  author: string;
  wiki?: string;
};

export type LocalAddon = StoreAddon & {
  id: number;
  settings?: any[];
};

export const fetchAvailableAddons = async (): Promise<StoreAddon[]> => {
  const res = await fetch(`${Enviroment.ADDON_SERVER_URL}`, { method: 'GET' });
  const data = (await res.json()) as StoreAddon[];

  return data;
};

export const fetchInstalledAddons = async (): Promise<LocalAddon[]> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200) {
    await renewTokens();

    return await fetchInstalledAddons();
  }

  const data = (await res.json()) as LocalAddon[];

  return data;
};

export const fetchInstalledAddonDetails = async (uuid: string): Promise<LocalAddon> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${uuid}`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200) {
    await renewTokens();

    return await fetchInstalledAddonDetails(uuid);
  }

  const data = (await res.json()) as LocalAddon;

  return data;
};

// export const installAddon = async (addon: StoreAddon) => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/install`, {
//     method: 'POST',
//     headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
//     body: JSON.stringify(addon),
//   });

//   if (res.status !== 200) {
//     await renewTokens();
//     await installAddon(addon);
//   }
// };

export const installAddon = async (addon: StoreAddon) => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/install/${addon.name}`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200) {
    await renewTokens();
    await installAddon(addon);
  }
};

export const deinstallAddon = async (id: number) => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${id}/deinstall`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } });

  if (res.status !== 200) {
    await renewTokens();
    await deinstallAddon(id);
  }
};
