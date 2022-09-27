import Enviroment from '../enviroment';

export const initDB = async () => {
  await fetch(`${Enviroment.BACKEND_URL}/install`, { method: 'GET' });
};
