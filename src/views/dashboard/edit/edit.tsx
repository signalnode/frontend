import { Button, SpeedDial } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, Legend } from 'recharts';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { useEffect, useState } from 'react';
import { fetchInstalledAddonDetails } from '../../../requests';
import { SignalNodeProperty } from '@signalnode/types';
import { Addon } from '../../../types/addon.type';
import { useNavigate } from 'react-router-dom';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Edit() {
  const navigate = useNavigate();

  const [addon, setAddon] = useState<Addon>();
  const layouts = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
    md: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
    sm: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    ],
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} variant="contained" sx={{ position: 'absolute', right: 16, bottom: 16 }} onClick={() => navigate('/dashboard/edit/add-card')}>
        Add Card
      </Button>
    </div>
  );
}
