import { UIConfig } from '@signalnode/types';
import Enviroment from '../env';
import { loadSettings } from '../utils/token-helper';
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
  config?: { [key: string]: string };
  uiConfig?: UIConfig<unknown>;
  disabled: boolean;
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
    try {
      await renewTokens();
      return await fetchInstalledAddons();
    } catch {
      return [];
    }
  }

  const data = (await res.json()) as LocalAddon[];

  return data;
};

export const fetchInstalledAddonDetails = async (name: string): Promise<LocalAddon> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200) {
    await renewTokens();

    return await fetchInstalledAddonDetails(name);
  }

  const data = (await res.json()) as LocalAddon;
  console.log(data);

  return data;
};

export const saveAddonConfig = async (name: string, config: object): Promise<void> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}/config`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body: JSON.stringify(config),
  });

  if (res.status !== 200) {
    await renewTokens();

    return await saveAddonConfig(name, config);
  }
};

export const startAddon = async (name: string): Promise<void> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}/start`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200 && res.status !== 404) {
    await renewTokens();

    return await startAddon(name);
  }
};

export const stopAddon = async (name: string): Promise<void> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}/stop`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200 && res.status !== 404) {
    await renewTokens();

    return await startAddon(name);
  }
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

  const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${addon.name}/install`, {
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
