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
import type { Equipment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EquipmentClientProps {
  equipment: Equipment[];
}

export function EquipmentClient({ equipment }: EquipmentClientProps) {
  const statusVariant: Record<Equipment['status'], 'destructive' | 'secondary' | 'default'> = {
    failed: 'destructive',
    warning: 'secondary',
    operational: 'default',
  };

  const sortedEquipment = React.useMemo(() => 
    [...equipment].sort((a, b) => b.healthScore - a.healthScore),
    [equipment]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Fleet</CardTitle>
        <CardDescription>An overview of all equipment in your facilities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead className="text-right">RUL (days)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEquipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.id}</div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[item.status]} className="capitalize">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={item.healthScore} className="h-2 w-24" />
                        <span className="text-sm text-muted-foreground">{item.healthScore}%</span>
                    </div>
                </TableCell>
                <TableCell className="text-right">{item.rul}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
