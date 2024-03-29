import Enviroment from '../env';
import { History } from '../types/history.type';
import { loadSettings, saveSettings } from '../utils/token-helper';

export const fetchHistory = async (options?: { properties?: string[]; relations?: true }, preventRetry?: boolean): Promise<History[]> => {
  const { accessToken } = loadSettings();
  const filter = options?.properties?.join(',');
  const todayStart = new Date();
  todayStart.setHours(0);
  todayStart.setMinutes(0);
  todayStart.setSeconds(0);
  const todayEnd = new Date();
  todayEnd.setHours(23);
  todayEnd.setMinutes(59);
  todayEnd.setSeconds(59);
  // filter?.unshift('?');
  const res = await fetch(
    `${Enviroment.BACKEND_URL}/history${
      filter ? `?createdAt[gte]=${todayStart.toISOString()}&createdAt[lte]=${todayEnd.toISOString()}&property[name][in]=${filter}` : ''
    }`,
    {
      method: 'GET',
      headers: { authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    }
  );

  saveSettings({ accessToken: res.headers.get('authorization')! });
  return (await res.json()) as History[];
};

export const fetchHistoryForProperty = async (id: number, options?: { from?: Date; to?: Date }, preventRetry?: boolean): Promise<History[]> => {
  const { accessToken } = loadSettings();
  const body = JSON.stringify({ propertyId: id, ...options });
  const res = await fetch(`${Enviroment.BACKEND_URL}/history`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    credentials: 'include',
    body,
  });

  saveSettings({ accessToken: res.headers.get('authorization')! });
  return (await res.json()) as History[];
};
