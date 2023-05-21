import { SignalNodeConfigLayout, SignalNodeProperty } from '@signalnode/types';
import Enviroment from '../env';
import { Integration } from '../types/integration.type';
import { loadSettings } from '../utils/token-helper';
import { renewTokens } from './authentication';

export type StoreIntegration = {
  name: string;
  description: string;
  version: string;
  author: string;
};

export const fetchUninstalledIntegrations = async (): Promise<StoreIntegration[]> => {
  const res = await fetch(`${Enviroment.ADDON_SERVER_URL}`, { method: 'GET' });
  const data = (await res.json()) as StoreIntegration[];

  return data;
};

export const fetchInstalledIntegrations = async (preventRetry?: boolean): Promise<Integration[]> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/integrations`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200 && !preventRetry) {
    try {
      await renewTokens();
      return await fetchInstalledIntegrations(true);
    } catch {
      return [];
    }
  }

  const data = (await res.json()) as Integration[];

  return data;
};

// export const fetchInstalledAddonDetails = async (name: string, preventRetry?: boolean): Promise<Addon | undefined> => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}`, {
//     method: 'GET',
//     headers: { authorization: `Bearer ${accessToken}` },
//   });

//   if (res.status !== 200 && !preventRetry) {
//     try {
//       await renewTokens();

//       return await fetchInstalledAddonDetails(name, true);
//     } catch {
//       return undefined;
//     }
//   }

//   const data = (await res.json()) as Addon;

//   return data;
// };

// export const saveAddonConfig = async (name: string, config: object, preventRetry?: boolean): Promise<void> => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}/config`, {
//     method: 'POST',
//     headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
//     body: JSON.stringify(config),
//   });

//   if (res.status !== 200 && !preventRetry) {
//     await renewTokens();

//     return await saveAddonConfig(name, config, true);
//   }
// };

// export const startAddon = async (name: string, preventRetry?: boolean): Promise<void> => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}/start`, {
//     method: 'GET',
//     headers: { authorization: `Bearer ${accessToken}` },
//   });

//   if (res.status !== 200 && res.status !== 404 && !preventRetry) {
//     await renewTokens();

//     return await startAddon(name, true);
//   }
// };

// export const stopAddon = async (name: string, preventRetry?: boolean): Promise<void> => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${name}/stop`, {
//     method: 'GET',
//     headers: { authorization: `Bearer ${accessToken}` },
//   });

//   if (res.status !== 200 && res.status !== 404 && !preventRetry) {
//     await renewTokens();

//     return await stopAddon(name, true);
//   }
// };

export const installIntegration = async (addon: StoreIntegration, preventRetry?: boolean) => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/integrations/${addon.name}/install`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200 && !preventRetry) {
    await renewTokens();
    await installIntegration(addon, true);
  }
};

// export const deinstallAddon = async (id: number, preventRetry?: boolean) => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${id}/deinstall`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } });

//   if (res.status !== 200 && !preventRetry) {
//     await renewTokens();
//     await deinstallAddon(id, true);
//   }
// };
