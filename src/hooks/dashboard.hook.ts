import { useState } from 'react';

export const useDashboardMode = (): [boolean, () => void] => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const toggleEditMode = () => setIsEditable((isEditable) => !isEditable);
  return [isEditable, toggleEditMode];
};
