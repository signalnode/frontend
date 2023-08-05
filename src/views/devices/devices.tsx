import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { fetchDevices, startDevice, stopDevice } from '../../requests';
import { Device } from '../../types/device.type';

import './devices.css';

export default function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>();

  const handleStartStop = async (isStarted: boolean, deviceName: string) => {
    isStarted ? await stopDevice(deviceName) : await startDevice(deviceName);
    const devices = await fetchDevices();
    setDevices(devices);
  };

  useEffect(() => {
    const _fetchDevices = async () => {
      const devices = await fetchDevices();
      setDevices(devices);
    };

    _fetchDevices();
  }, []);

  return (
    <div className="devices">
      {devices?.map((device) => (
        <Card key={device.id} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              {device.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {device.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color={device.activated ? 'error' : 'success'} onClick={() => handleStartStop(device.activated, device.name)}>
              {device.activated ? 'Stop' : 'Start'}
            </Button>
            <Button size="small" onClick={() => navigate(`/devices/${device.name}`)}>
              Config
            </Button>
          </CardActions>
        </Card>
      ))}
      <Button variant="contained" sx={{ position: 'absolute', right: 16, bottom: 16 }} onClick={() => navigate('/devices/add')}>
        Add device
      </Button>
    </div>
  );
}
