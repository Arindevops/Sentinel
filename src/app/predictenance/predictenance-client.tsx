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
import type { PredictenanceTask } from '@/lib/types';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PredictenanceClientProps {
  tasks: PredictenanceTask[];
}

const ClientFormattedDate = ({ timestamp, formatType }: { timestamp: string, formatType: 'distance' | 'full' }) => {
    const [formattedDate, setFormattedDate] = React.useState('');
  
    React.useEffect(() => {
        if (formatType === 'distance') {
            setFormattedDate(formatDistanceToNow(new Date(timestamp), { addSuffix: true }));
        } else {
            setFormattedDate(format(new Date(timestamp), 'PPpp'));
        }
    }, [timestamp, formatType]);
  
    return <>{formattedDate}</>;
  };

export function PredictenanceClient({ tasks }: PredictenanceClientProps) {
  const priorityVariant: Record<PredictenanceTask['priority'], 'destructive' | 'secondary' | 'default'> = {
    high: 'destructive',
    medium: 'secondary',
    low: 'default',
  };

  const statusVariant: Record<PredictenanceTask['status'], 'destructive' | 'secondary' | 'default' | 'outline'> = {
    pending: 'secondary',
    'in-progress': 'default',
    completed: 'outline',
  };

  const sortedTasks = React.useMemo(() => 
    [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    [tasks]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Predictenance Tasks</CardTitle>
        <CardDescription>A complete log of all scheduled and completed predictenance tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="font-medium">{task.equipmentName}</div>
                  <div className="text-xs text-muted-foreground">{task.equipmentId}</div>
                </TableCell>
                <TableCell>{task.task}</TableCell>
                <TableCell>
                  <ClientFormattedDate timestamp={task.dueDate} formatType='full' />
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[task.status]} className="capitalize">
                    {task.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={priorityVariant[task.priority]} className="capitalize">
                    {task.priority}
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
