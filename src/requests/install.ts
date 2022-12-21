import Enviroment from '../env';

export const initDB = async () => {
  await fetch(`${Enviroment.BACKEND_URL}/install`, { method: 'GET' });
};
