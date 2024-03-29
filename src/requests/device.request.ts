import { SignalNodeConfigLayout, SignalNodeProperty } from '@signalnode/types';
import Enviroment from '../env';
import { Device } from '../types/device.type';
import { Integration } from '../types/integration.type';
import { loadSettings, saveSettings } from '../utils/token-helper';

export const fetchDevices = async (relations?: boolean, preventRetry?: boolean): Promise<Device[]> => {
  const { accessToken } = loadSettings();

  const todayStart = new Date();
  todayStart.setHours(0);
  todayStart.setMinutes(0);
  todayStart.setSeconds(0);
  const todayEnd = new Date();
  todayEnd.setHours(23);
  todayEnd.setMinutes(59);
  todayEnd.setSeconds(59);

  const res = await fetch(
    `${Enviroment.BACKEND_URL}/devices${
      relations
        ? `?relations=properties,properties.history&properties[history][createdAt][gte]=${todayStart.toISOString()}&properties[history][createdAt][lte]=${todayEnd.toISOString()}`
        : ''
    }`,
    {
      method: 'GET',
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    }
  );

  saveSettings({ accessToken: res.headers.get('authorization')! });
  const data = (await res.json()) as Device[];
  return data;
};

export const createDevice = async (name: string, description: string, integration: Integration, preventRetry?: boolean): Promise<void> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/devices`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, description, integration }),
  });

  saveSettings({ accessToken: res.headers.get('authorization')! });
};

export const fetchDevice = async (name: string, preventRetry?: boolean): Promise<Device | undefined> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/devices/${name}?relations=properties`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  saveSettings({ accessToken: res.headers.get('Authorization')! });
  const data = (await res.json()) as Device;
  return data;
};

export const saveDeviceConfig = async (name: string, config: object, preventRetry?: boolean): Promise<void> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/devices/${name}/config`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(config),
  });

  saveSettings({ accessToken: res.headers.get('authorization')! });
};

export const startDevice = async (name: string, preventRetry?: boolean): Promise<void> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/devices/${name}/start`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  saveSettings({ accessToken: res.headers.get('authorization')! });
};

export const stopDevice = async (name: string, preventRetry?: boolean): Promise<void> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/devices/${name}/stop`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  saveSettings({ accessToken: res.headers.get('authorization')! });
};

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

// export const installAddon = async (addon: StoreAddon, preventRetry?: boolean) => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${addon.name}/install`, {
//     method: 'GET',
//     headers: { authorization: `Bearer ${accessToken}` },
//   });

//   if (res.status !== 200 && !preventRetry) {
//     await renewTokens();
//     await installAddon(addon, true);
//   }
// };

// export const deinstallAddon = async (id: number, preventRetry?: boolean) => {
//   const { accessToken } = loadSettings();

//   const res = await fetch(`${Enviroment.BACKEND_URL}/addons/${id}/deinstall`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}` } });

//   if (res.status !== 200 && !preventRetry) {
//     await renewTokens();
//     await deinstallAddon(id, true);
//   }
// };
