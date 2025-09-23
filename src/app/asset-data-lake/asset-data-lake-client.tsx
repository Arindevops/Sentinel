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
import type { AssetData } from '@/lib/types';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AssetDataLakeClientProps {
  data: AssetData[];
}

const ClientFormattedDate = ({ timestamp }: { timestamp: string }) => {
    const [formattedDate, setFormattedDate] = React.useState('');
  
    React.useEffect(() => {
        setFormattedDate(format(new Date(timestamp), 'PPpp'));
    }, [timestamp]);
  
    return <>{formattedDate}</>;
  };

export function AssetDataLakeClient({ data }: AssetDataLakeClientProps) {

  const sortedData = React.useMemo(() => 
    [...data].sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime()),
    [data]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingested Asset Data</CardTitle>
        <CardDescription>A raw log of all data ingested from uploaded files.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Create Date</TableHead>
              <TableHead className="text-right">Temperature (°F)</TableHead>
              <TableHead className="text-right">Pressure (PSI)</TableHead>
              <TableHead className="text-right">Vibration (g)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.fileName}</TableCell>
                <TableCell>
                  <div className="font-medium">{row.equipmentName}</div>
                  <div className="text-xs text-muted-foreground">{row.equipmentId}</div>
                </TableCell>
                <TableCell>
                  <ClientFormattedDate timestamp={row.createDate} />
                </TableCell>
                <TableCell className="text-right">{row.temperature.toFixed(2)}</TableCell>
                <TableCell className="text-right">{row.pressure.toFixed(2)}</TableCell>
                <TableCell className="text-right">{row.vibration.toFixed(3)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
