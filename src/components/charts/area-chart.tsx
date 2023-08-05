import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export type AreaChartAxis = { name: string; stroke: string; fill: string };

export type AreaChartData = { [key: string]: string | number | boolean | Date };

export type AreaChartOptions = {
  width?: number;
  height?: number;
  responsive?: boolean;
  showTooltip?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  smooth?: boolean;
};

type AreaChartCard = { xAxis: string | undefined; yAxes: AreaChartAxis[] | undefined; data: AreaChartData[] | undefined; options?: AreaChartOptions };

export default function AreaChartCard({ xAxis, yAxes, data, options }: AreaChartCard) {
  const renderAreas = () => {
    if (!xAxis || !yAxes || yAxes.length === 0 || !data) {
      return <h1>No Data</h1>; // TODO: better presentation
    }

    return yAxes.map((yAxis) => <Area key={yAxis.name} {...(options?.smooth && { type: 'monotone' })} dataKey={yAxis.name} stroke={yAxis.stroke} fill={yAxis.fill} />);
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        {options?.showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxis} hide={options?.hideXAxis ?? false} />
        <YAxis hide={options?.hideYAxis ?? false} unit="kW" />
        {options?.showTooltip && <Tooltip />}

        {renderAreas()}
      </AreaChart>
    </ResponsiveContainer>
  );
}
