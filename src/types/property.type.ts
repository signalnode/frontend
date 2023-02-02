export type Property = {
  name: string;
  description: string;
  value: string | number | boolean;
  unit: string;
  useHistory: boolean;
  history?: any[];
};
