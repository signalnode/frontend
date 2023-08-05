import { Button } from '@mui/material';
import { startDevice, stopDevice } from '../../../../requests';

export default function OverviewTab({ name, started, onToggleStartStop }: { name: string; started: boolean; onToggleStartStop: () => void }) {
  const handleStart = async () => {
    await startDevice(name);
    onToggleStartStop();
  };

  const handleStop = async () => {
    await stopDevice(name);
    onToggleStartStop();
  };

  return (
    <Button variant="outlined" onClick={started ? handleStop : handleStart}>
      {started ? 'Stop' : 'Start'}
    </Button>
  );
}
