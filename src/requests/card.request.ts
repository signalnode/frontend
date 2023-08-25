import Enviroment from '../env';
import { Card } from '../types/card.type';
import { loadSettings } from '../utils/token-helper';
import { renewTokens } from './authentication';

export const fetchCards = async (preventRetry?: boolean): Promise<Card[]> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/cards`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}`, credentials: 'include' } });

  if (res.status !== 200 && !preventRetry) {
    try {
      await renewTokens();
      return await fetchCards(true);
    } catch {
      return [];
    }
  }

  return (await res.json()) as Card[];
};

export const addCard = async (cardId: number, preventRetry?: boolean): Promise<Card[]> => {
  const { accessToken } = loadSettings();

  const res = await fetch(`${Enviroment.BACKEND_URL}/cards`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ cardId }),
  });

  if (res.status !== 200 && !preventRetry) {
    try {
      await renewTokens();
      return await fetchCards(true);
    } catch {
      return [];
    }
  }

  return (await res.json()) as Card[];
};
