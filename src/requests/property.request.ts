import Enviroment from '../env';
import { Property } from '../types/property.type';
import { loadSettings } from '../utils/token-helper';
import { renewTokens } from './authentication';

export const fetchProperties = async (preventRetry?: boolean): Promise<Property[]> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/properties`, {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  if (res.status !== 200 && !preventRetry) {
    try {
      await renewTokens();
      return await fetchProperties(true);
    } catch {
      return [];
    }
  }
  const data = (await res.json()) as Property[];
  return data;
};
