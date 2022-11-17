import { Button } from '@mui/material';
import { startAddon } from '../../../../requests';

export default function OverviewTab({ name }: { name: string }) {
  const handleStart = async () => {
    await startAddon(name);
  };

  return (
    <Button variant="outlined" onClick={handleStart}>
      Start
    </Button>
  );
}
