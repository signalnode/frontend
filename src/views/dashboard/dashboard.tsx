import { Button, SpeedDial } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, Legend } from 'recharts';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { useEffect, useState } from 'react';
import { fetchInstalledAddonDetails } from '../../requests';
import { SignalNodeProperty } from '@signalnode/types';
import { Addon } from '../../types/addon.type';
import AreaChartCard, { AreaChartData } from '../../components/dashboard-cards/area-chart';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
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

  useEffect(() => {
    const fetchAddonDetails = async () => {
      const addon = await fetchInstalledAddonDetails('signalnode-solaredge');
      console.log('Addon:', addon);

      setAddon(addon);
    };

    fetchAddonDetails();
  }, []);

  const test = (entity: SignalNodeProperty<unknown, unknown>) => {
    return entity?.history?.map((history) => ({ value: history.value, time: new Date(history.timestamp).getHours() })) ?? [];
  };

  const data: AreaChartData = {
    xAxis: 'time',
    area: ['v1', 'v2', 'v3'],
    data: [
      {
        v1: 1,
        v2: 5,
        v3: 1,
        time: 0,
      },
      {
        v1: 2,
        v2: 1,
        v3: 8,
        time: 1,
      },
      {
        v1: 3,
        v2: 8,
        v3: 1,
        time: 2,
      },
      {
        v1: 4,
        v2: 2,
        v3: 5,
        time: 3,
      },
      {
        v1: 8,
        v2: 5,
        v3: 2,
        time: 4,
      },
      {
        v1: 1,
        v2: 3,
        v3: 8,
        time: 5,
      },
    ],
  };

  return (
    <div>
      <AreaChartCard data={data} />
    </div>
  );
}
