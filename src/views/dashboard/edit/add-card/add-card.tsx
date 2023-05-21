import { ExpandMore } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AreaChartCard from '../../../../components/dashboard-cards/area-chart';

const cards = [
  {
    name: 'Area Chart',
    description: 'Renders a chart with one oder more lines',
    type: 'Chart',
  },
];

export default function AddCard() {
  const renderCards = () =>
    cards.map(({ name, description, type }) => (
      <Card key={1} sx={{ maxWidth: 350 }}>
        <CardHeader title={name} subheader={description} />
        <CardMedia
          component={AreaChartCard}
          data={{
            xAxis: 'x',
            yAxis: 'y',
            data: [
              { x: 1, y: 1 },
              { x: 2, y: 3 },
              { x: 3, y: 2 },
              { x: 4, y: 1 },
              { x: 5, y: 2 },
              { x: 6, y: 4 },
              { x: 7, y: 1 },
              { x: 8, y: 1 },
            ],
          }}
          options={{ showTooltip: false, showLegend: false, showGrid: false, showXAxis: false, showYAxis: false, smooth: true }}
        />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined">Add</Button>
        </CardActions>
      </Card>
    ));
  return <div>{renderCards()}</div>;
}
