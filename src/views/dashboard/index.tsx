import { SpeedDial } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, Legend } from 'recharts';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { useEffect, useState } from 'react';
import { fetchInstalledAddonDetails, LocalAddon } from '../../requests';
import { SignalNodeEntity } from '@signalnode/types';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
  const [addon, setAddon] = useState<LocalAddon>();
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

  const test = (entity: SignalNodeEntity<unknown, unknown>) => {
    return entity?.history?.map((history) => ({ value: history.value, time: new Date(history.timestamp).getHours() })) ?? [];
  };

  return (
    <div>
      <ResponsiveGridLayout className="layout" layouts={layouts} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 2 }}>
        <div key="1">
          {addon?.entities[0].name}
          <ResponsiveContainer>
            <AreaChart data={test(addon?.entities[0])}>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              {/* <Line type="monotone" dataKey="value" stroke="#8884d8" /> */}
              <XAxis dataKey="time" />
              <YAxis />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div key="2">
          {addon?.entities[1].name}
          <ResponsiveContainer>
            <AreaChart data={test(addon?.entities[1])}>
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              {/* <Line type="monotone" dataKey="value" stroke="#8884d8" /> */}
              <XAxis dataKey="time" />
              <YAxis />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* <ResponsiveContainer key="2" width={300} height={150}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer key="3" width={300} height={150}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer> */}
      </ResponsiveGridLayout>
      <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<SettingsIcon />} onClick={() => console.log('Test')} />
    </div>
  );
}
