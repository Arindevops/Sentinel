'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Anomaly } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AnomaliesClientProps {
  anomalies: Anomaly[];
}

const ClientFormattedDate = ({ timestamp }: { timestamp: string }) => {
    const [formattedDate, setFormattedDate] = React.useState('');
  
    React.useEffect(() => {
      setFormattedDate(format(new Date(timestamp), 'PPpp'));
    }, [timestamp]);
  
    return <>{formattedDate}</>;
};

export function AnomaliesClient({ anomalies }: AnomaliesClientProps) {
  const priorityVariant: Record<Anomaly['severity'], 'destructive' | 'secondary' | 'default'> = {
    high: 'destructive',
    medium: 'secondary',
    low: 'default',
  };

  const sortedAnomalies = React.useMemo(() => 
    [...anomalies].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [anomalies]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Log</CardTitle>
        <CardDescription>A complete log of all detected anomalies.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAnomalies.map((anomaly) => (
              <TableRow key={anomaly.id}>
                <TableCell>
                  <div className="font-medium">{anomaly.equipmentName}</div>
                  <div className="text-xs text-muted-foreground">{anomaly.equipmentId}</div>
                </TableCell>
                <TableCell>{anomaly.description}</TableCell>
                <TableCell>
                  <ClientFormattedDate timestamp={anomaly.timestamp} />
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={priorityVariant[anomaly.severity]} className="capitalize">
                    {anomaly.severity}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
