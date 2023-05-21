import Enviroment from '../env';
import { History } from '../types/history.type';
import { loadSettings } from '../utils/token-helper';
import { renewTokens } from './authentication';

export const fetchHistoryForProperty = async (id: number, options?: { from?: Date; to?: Date }, preventRetry?: boolean): Promise<History[]> => {
  const { accessToken } = loadSettings();
  const body = JSON.stringify({ propertyId: id, ...options });
  const res = await fetch(`${Enviroment.BACKEND_URL}/history`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body,
  });

  if (res.status !== 200 && !preventRetry) {
    try {
      await renewTokens();
      return await fetchHistoryForProperty(id, options, true);
    } catch {
      return [];
    }
  }

  return (await res.json()) as History[];
};
