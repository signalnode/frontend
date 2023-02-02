import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export type AreaChartData = {
  xAxis?: string;
  yAxis?: string;
  area: string | string[];
  data: { [key: string]: number }[];
};

export default function AreaChartCard({ data: { xAxis, yAxis, area, data } }: { data: AreaChartData }) {
  const renderAreas = () => {
    if (typeof area === 'string') {
      return <Area type="monotone" dataKey={area} stroke="#8884d8" fill="#8884d8" />;
    } else {
      return area.map((a) => <Area type="monotone" dataKey={a} stroke="#8884d8" fill="#8884d8" />);
    }
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis />
          <Tooltip />

          {renderAreas()}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
