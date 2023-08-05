import { Device } from './device.type';
import { History } from './history.type';

export type Property = {
  id: number;
  name: string;
  description: string;
  value: string | number | boolean;
  unit: string;
  useHistory: boolean;
  history?: History[];
  devices?: Device[];
};
