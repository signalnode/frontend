import Enviroment from '../env';
import { Card } from '../types/card.type';
import { loadSettings, saveSettings } from '../utils/token-helper';

export const fetchCards = async (): Promise<Card[]> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/cards`, { method: 'GET', headers: { authorization: `Bearer ${accessToken}` }, credentials: 'include' });

  if (res.status !== 200) return [];
  saveSettings({ accessToken: res.headers.get('authorization') });
  return (await res.json()) as Card[];
};

//TODO: Types may be not correct
export const addCard = async ({ type, config }: { type: string; config: object }): Promise<Card[]> => {
  const { accessToken } = loadSettings();
  const res = await fetch(`${Enviroment.BACKEND_URL}/cards`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ type, config }),
  });

  if (res.status !== 200) return [];
  saveSettings({ accessToken: res.headers.get('authorization')! });
  return (await res.json()) as Card[];
};
