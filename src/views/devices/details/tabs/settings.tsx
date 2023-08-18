import { Button } from '@mui/material';
import { startDevice } from '../../../../requests';
import { FormRenderer } from '../../../../components/form-renderer';
import { Device } from '../../../../types/device.type';
import { SignalNodeConfigLayout } from '@signalnode/types';

export default function SettingsTab({ device, onSave }: { device: Device; onSave: () => void }) {
  return <FormRenderer addonName={device.name} config={device.config} configLayout={device.configSchema as SignalNodeConfigLayout<unknown>} onSave={onSave} />;
}
