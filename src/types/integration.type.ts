import { SignalNodeConfigLayout } from '@signalnode/types';
import { Device } from './device.type';

export type Integration = {
  id: number;
  name: string;
  description: string;
  version: string;
  author: string;
  configSchema: SignalNodeConfigLayout<unknown>;
  useForeignProperties: boolean;
  devices: Device[];
  createdAt: string;
  updatedAt: string;
};
