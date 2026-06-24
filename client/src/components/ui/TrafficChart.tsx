import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

type TrafficPoint = {
  period: string
  traffic: number
}

type Props = {
    data: TrafficPoint[]
}

export default function IndexLineChart({data}: Props) {
  return (
    <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={data}>
      <CartesianGrid stroke="var(--color-border-3)" strokeDasharray="5 5" />
      <XAxis dataKey="period" stroke="var(--color-text-3)" />
      <YAxis width="auto" stroke="var(--color-text-3)" />
      <Line
        type="monotone"
        dataKey="traffic"
        stroke="var(--color-chart-1)"
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{
          stroke: 'var(--color-surface-base)',
        }}
      />
    </LineChart>
  );
}

export type {
    TrafficPoint
}