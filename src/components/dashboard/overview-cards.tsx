import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Cpu, AlertTriangle, Wrench, ShieldAlert } from 'lucide-react';
import type { OverviewData } from '@/lib/types';
import Link from 'next/link';

interface OverviewCardsProps {
  data: OverviewData;
}

export function OverviewCards({ data }: OverviewCardsProps) {
  const metrics = [
    {
      title: 'Active Equipment',
      value: data.activeEquipment,
      icon: Cpu,
      description: 'Total operational units',
      href: '/equipment',
    },
    {
      title: 'Anomalies Detected',
      value: data.anomaliesDetected,
      icon: AlertTriangle,
      description: 'In the last 24 hours',
      href: '/anomalies',
    },
    {
      title: 'Pending Predictenance',
      value: data.pendingPredictenance,
      icon: Wrench,
      description: 'Upcoming service tasks',
      href: '/predictenance',
    },
    {
      title: 'High Failure Risk',
      value: data.predictedFailures,
      icon: ShieldAlert,
      description: 'Units with >75% failure prob.',
      href: '/equipment?risk=high',
    },
  ];

  return (
    <>
      {metrics.map((metric) => (
        <Link href={metric.href} key={metric.title}>
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
