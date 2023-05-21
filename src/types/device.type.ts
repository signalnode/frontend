import { Integration } from './integration.type';
import { Property } from './property.type';

export type Device = {
  id: number;
  name: string;
  description: string;
  activated: boolean;
  config?: { [key: string]: string };
  integration: Integration;
  properties: Property[];
  createdAt: string;
  updatedAt: string;
};
