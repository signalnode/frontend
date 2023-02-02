import { SignalNodeConfigLayout } from '@signalnode/types';
import { Property } from './property.type';

export type Addon = {
  name: string;
  description: string;
  version: string;
  author: string;
  activated: boolean;
  configLayout: SignalNodeConfigLayout<unknown>;
  config?: { [key: string]: string };
  properties: Property[];
};
