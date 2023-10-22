import { ExpandMore } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AreaChartCard from '../../../../components/charts/area-chart';
import { addCard } from '../../../../requests';
import CardConfigDialog from './config/card-config';
import { useState } from 'react';

const cards = [
  {
    id: 1,
    name: 'Area Chart',
    description: 'Renders a chart with one or more lines',
    type: 'Chart',
  },
];

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState<number>();
  const handleCardSelected = (index: number) => {
    setSelectedCard(index);
  };

  const onSaveCardConfig = (config: any) => {
    addCard({ type: cards[selectedCard!].type, config });
  };

  const renderCards = () =>
    cards.map(({ name, description, type }, index) => (
      <Card key={1} sx={{ maxWidth: 350 }}>
        <CardHeader title={name} subheader={description} />
        <CardMedia
          component={AreaChartCard}
          xAxis="x"
          yAxes={[{ name: 'y', fill: '#00f', stroke: '#00a' }]}
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 3 },
            { x: 3, y: 2 },
            { x: 4, y: 1 },
            { x: 5, y: 2 },
            { x: 6, y: 4 },
            { x: 7, y: 1 },
            { x: 8, y: 1 },
          ]}
          options={{ showTooltip: false, showLegend: false, showGrid: false, hideXAxis: true, hideYAxis: true, smooth: true }}
        />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => handleCardSelected(index)}>
            Add
          </Button>
        </CardActions>
      </Card>
    ));
  return (
    <div>
      {renderCards()}
      <CardConfigDialog open={selectedCard !== undefined} onSave={onSaveCardConfig} onClose={() => setSelectedCard(undefined)} />
    </div>
  );
}
