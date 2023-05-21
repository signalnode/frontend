import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { fetchDevices } from '../../requests';
import { Device } from '../../types/device.type';

export default function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>();

  useEffect(() => {
    const _fetchDevices = async () => {
      const devices = await fetchDevices();
      console.log(devices);

      setDevices(devices);
    };

    _fetchDevices();
  }, []);

  return (
    <>
      {devices?.map((device) => (
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {device.name}
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {device.description}
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate(`/devices/${device.name}`)}>
              Config
            </Button>
          </CardActions>
        </Card>
      ))}
      <Button variant="contained" sx={{ position: 'absolute', right: 16, bottom: 16 }} onClick={() => navigate('/devices/add')}>
        Add device
      </Button>
    </>
  );
}
