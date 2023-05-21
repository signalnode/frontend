import { Property } from './property.type';

export type Card = {
  type: string;
  config: object;
  createdAt: string;
  updatedAt: string;
  properties: Property[];
};
