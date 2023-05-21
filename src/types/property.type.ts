export type Property = {
  id: number;
  name: string;
  description: string;
  value: string | number | boolean;
  unit: string;
  useHistory: boolean;
  history?: { value: string | number | boolean; unit: string; createdAt: string }[];
};
