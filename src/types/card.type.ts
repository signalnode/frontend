import { Property } from './property.type';

export type Card = {
  id: number;
  type: string;
  config: object;
  createdAt: string;
  updatedAt: string;
  properties: Property[];
};
