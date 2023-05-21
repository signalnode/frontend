import { Button, SpeedDial } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, Legend } from 'recharts';

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { useEffect, useState } from 'react';
import { fetchCards, fetchInstalledAddonDetails } from '../../requests';
import { SignalNodeProperty } from '@signalnode/types';
import { Addon } from '../../types/integration.type';
import AreaChartCard, { AreaChartData } from '../../components/dashboard-cards/area-chart';
import { Card } from '../../types/card.type';
import { fetchHistoryForProperty } from '../../requests/history.request';
import { Property } from '../../types/property.type';

const ResponsiveGridLayout = WidthProvider(Responsive);

const areaChartConfig = {
  history: 'today',
};

export default function Dashboard() {
  const [cards, setCards] = useState<Card[]>();
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
    const from = new Date();
    from.setDate(from.getDate() - 1);
    const to = new Date();
    const _fetchCards = async () => {
      const cards = await fetchCards();
      for (const card of cards) {
        for (const property of card.properties) {
          property.history = await fetchHistoryForProperty(property.id, { from, to });
        }
      }
      setCards(cards);
    };

    _fetchCards();
  }, []);

  const selectedProperties = [
    { y: 'currentProduction', stroke: '#37bd4b', fill: '#37bd4b' },
    { y: 'currentConsumption', stroke: '#ff7878', fill: '#ff7878' },
    { y: 'currentSelfConsumption', stroke: '#468bfa', fill: '#468bfa' },
  ]; // Comes from GUI

  const getData = (properties: Property[]) => {
    const size = Math.max(...properties.map((property) => property.history?.length ?? 0));
    const results = [];
    for (let i = 0; i < size; i++) {
      const data: any = {};
      for (const propertyName of selectedProperties) {
        const property = properties.find((property) => property.name === propertyName.y)!;
        data[propertyName.y] = property.history![i]!.value;
        if (!data['time']) data['time'] = new Date(property.history![i]!.createdAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); // TODO: Convert date to corenponding time unit
      }
      results.push(data);
    }

    return results;
  };

  return (
    <div>
      {cards?.map((card, index) => (
        <AreaChartCard
          key={index}
          data={{ xAxis: 'time', yAxis: selectedProperties, data: getData(card.properties) }}
          options={{ showGrid: true, showLegend: true, showXAxis: true, showYAxis: true }}
        />
      ))}
    </div>
  );
}
