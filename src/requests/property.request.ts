import Enviroment from '../env';
import { Property } from '../types/property.type';
import { loadSettings, saveSettings } from '../utils/token-helper';

export const fetchProperties = async (preventRetry?: boolean): Promise<Property[]> => {
  const { accessToken } = loadSettings();

  const todayStart = new Date();
  todayStart.setHours(0);
  todayStart.setMinutes(0);
  todayStart.setSeconds(0);
  const todayEnd = new Date();
  todayEnd.setHours(23);
  todayEnd.setMinutes(59);
  todayEnd.setSeconds(59);

  // const res = await fetch(
  //   `${
  //     Enviroment.BACKEND_URL
  //   }/properties?relations=devices,history&history[createdAt][gte]=${todayStart.toISOString()}&history[createdAt][lte]=${todayEnd.toISOString()}`,
  //   {
  //     method: 'GET',
  //     headers: { authorization: `Bearer ${accessToken}` },
  //     credentials: 'include',
  //   }
  // );

  const res = await fetch(`${Enviroment.BACKEND_URL}/properties?relations=devices`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });
  saveSettings({ accessToken: res.headers.get('authorization')! });
  const data = (await res.json()) as Property[];
  return data;
};

export const fetchPropertiesForDevice = async (deviceName: string, preventRetry?: boolean): Promise<Property[]> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/properties?device=${deviceName}`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  saveSettings({ accessToken: res.headers.get('authorization')! });
  const data = (await res.json()) as Property[];
  return data;
};
