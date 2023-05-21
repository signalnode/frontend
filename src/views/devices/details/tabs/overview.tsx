import { Button } from '@mui/material';
import { startDevice } from '../../../../requests';

export default function OverviewTab({ name, started }: { name: string; started: boolean }) {
  const handleStart = async () => {
    await startDevice(name);
  };

  const handleStop = async () => {
    // await stopAddon(name);
  };

  return (
    <Button variant="outlined" onClick={started ? handleStop : handleStart}>
      {started ? 'Stop' : 'Start'}
    </Button>
  );
}
