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
import { ScrollArea } from '../ui/scroll-area';
import { ClientFormattedDate } from '../client-formatted-date';

interface PredictenanceScheduleProps {
  tasks: PredictenanceTask[];
}

export function PredictenanceSchedule({ tasks }: PredictenanceScheduleProps) {
  const priorityVariant: Record<PredictenanceTask['priority'], 'destructive' | 'secondary' | 'default'> = {
    high: 'destructive',
    medium: 'secondary',
    low: 'default',
  };

  const upcomingTasks = tasks
    .filter((task) => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <ScrollArea className="h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipment</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Due</TableHead>
            <TableHead className="text-right">Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {upcomingTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="font-medium">{task.equipmentName}</div>
                <div className="text-xs text-muted-foreground">{task.equipmentId}</div>
              </TableCell>
              <TableCell>{task.task}</TableCell>
              <TableCell>
                <ClientFormattedDate timestamp={task.dueDate} formatType="distance" />
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
    </ScrollArea>
  );
}
