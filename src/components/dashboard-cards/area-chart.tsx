import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export type AreaChartData = {
  xAxis: string;
  yAxis: string | string[] | { y: string; stroke: string; fill: string }[];
  data: { [key: string]: number }[];
};

export type AreaChartOptions = {
  width?: number;
  height?: number;
  responsive?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  smooth?: boolean;
};

export default function AreaChartCard({ data: { xAxis, yAxis, data }, options }: { data: AreaChartData; options?: AreaChartOptions }) {
  const renderAreas = () => {
    if (typeof yAxis === 'string') {
      return <Area {...(options?.smooth && { type: 'monotone' })} dataKey={yAxis} />;
    } else {
      return yAxis.map((y, i) => {
        if (typeof y === 'string') {
          return <Area key={i} {...(options?.smooth && { type: 'monotone' })} dataKey={y} />;
        } else {
          return <Area key={i} {...(options?.smooth && { type: 'monotone' })} dataKey={y.y} stroke={y.stroke} fill={y.fill} />;
        }
      });
    }
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        {options?.showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxis} hide={!options?.showXAxis ?? false} />
        <YAxis hide={!options?.showYAxis ?? false}  unit="kW" />
        {options?.showTooltip && <Tooltip />}

        {renderAreas()}
      </AreaChart>
    </ResponsiveContainer>
  );
}
