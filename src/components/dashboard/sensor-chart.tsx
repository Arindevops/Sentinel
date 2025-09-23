'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Line, LineChart, Legend } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { SensorDataPoint } from '@/lib/types';

interface SensorChartProps {
  data: SensorDataPoint[];
}

const chartConfig = {
  temperature: {
    label: 'Temperature (°F)',
    color: 'hsl(var(--chart-1))',
  },
  pressure: {
    label: 'Pressure (PSI)',
    color: 'hsl(var(--chart-2))',
  },
  vibration: {
    label: 'Vibration (g)',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function SensorChart({ data }: SensorChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart data={data} margin={{ left: 12, right: 12, top: 5, bottom: 5 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={6}
          domain={['dataMin - 10', 'dataMax + 10']}
          tickFormatter={(value) => `${value.toFixed(0)}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={6}
          domain={[0, 'dataMax + 0.5']}
          tickFormatter={(value) => `${value.toFixed(1)}`}
          label={{ value: 'Vibration (g)', angle: -90, position: 'insideRight', offset: 10, style: { textAnchor: 'middle' } }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Legend content={<ChartLegendContent />} />
        <Line
          dataKey="temperature"
          type="monotone"
          stroke="var(--color-temperature)"
          strokeWidth={2}
          dot={false}
          yAxisId="left"
          name="Temperature"
        />
        <Line
          dataKey="pressure"
          type="monotone"
          stroke="var(--color-pressure)"
          strokeWidth={2}
          dot={false}
          yAxisId="left"
          name="Pressure"
        />
        <Line
          dataKey="vibration"
          type="monotone"
          stroke="var(--color-vibration)"
          strokeWidth={2}
          dot={false}
          yAxisId="right"
          name="Vibration"
        />
      </LineChart>
    </ChartContainer>
  );
}
