
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { handleCreateChangeRequest } from '@/app/actions';
import { Loader2, PlusCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ClientFormattedDate } from '@/components/client-formatted-date';

interface PredictenanceClientProps {
  tasks: PredictenanceTask[];
}

const changeRequestFormSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  assignmentGroup: z.string({ required_error: 'Please select an assignment group.' }),
});

type ChangeRequestFormValues = z.infer<typeof changeRequestFormSchema>;

export function PredictenanceClient({ tasks }: PredictenanceClientProps) {
  const [changeRequestTask, setChangeRequestTask] = React.useState<PredictenanceTask | null>(null);
  const { toast } = useToast();

  const form = useForm<ChangeRequestFormValues>({
    resolver: zodResolver(changeRequestFormSchema),
    defaultValues: {
      description: '',
    }
  });

  const { formState: { isSubmitting } } = form;

  const handleCreateChangeClick = (task: PredictenanceTask) => {
    setChangeRequestTask(task);
    form.reset({
      description: task.task,
      assignmentGroup: undefined,
    });
  };

  const handleCloseDialog = () => {
    setChangeRequestTask(null);
    form.reset();
  };

  const onSubmit = async (values: ChangeRequestFormValues) => {
    if (!changeRequestTask) return;

    const changeData = {
      configurationItem: `${changeRequestTask.equipmentName} (${changeRequestTask.equipmentId})`,
      description: values.description,
      scheduleDate: changeRequestTask.dueDate,
      priority: changeRequestTask.priority,
      assignmentGroup: values.assignmentGroup,
    };

    const result = await handleCreateChangeRequest(changeData);

    if (result.success) {
      toast({
        title: 'Change Request Created',
        description: `Change Request ${result.data.changeId} has been successfully created.`,
      });
      handleCloseDialog();
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to Create Change Request',
        description: result.error,
      });
    }
  };

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
    <TooltipProvider>
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
                  <TableHead className="text-neon">Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell>
                      <Badge variant={priorityVariant[task.priority]} className="capitalize">
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleCreateChangeClick(task)} disabled={task.status === 'completed'}>
                            <PlusCircle className="h-4 w-4" />
                            <span className="sr-only">Create Change Request</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Create Change Request</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>

      <Dialog open={!!changeRequestTask} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Change Request</DialogTitle>
            <DialogDescription>
              Create a new change request for the task on{' '}
              <strong>{changeRequestTask?.equipmentName}</strong>.
            </DialogDescription>
          </DialogHeader>
          {changeRequestTask && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Configuration Item</Label>
                    <p className="text-sm text-muted-foreground">{changeRequestTask.equipmentName} ({changeRequestTask.equipmentId})</p>
                  </div>
                  <div>
                    <Label>Scheduled Date</Label>
                    <p className="text-sm text-muted-foreground">
                      <ClientFormattedDate timestamp={changeRequestTask.dueDate} formatType='full' />
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the change"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label>Priority</Label>
                      <p className="text-sm font-medium capitalize">
                        <Badge variant={priorityVariant[changeRequestTask.priority]}>
                          {changeRequestTask.priority}
                        </Badge>
                      </p>
                   </div>

                    <FormField
                      control={form.control}
                      name="assignmentGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assignment Group</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select group..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hardware-team">Hardware Team</SelectItem>
                              <SelectItem value="software-team">Software Team</SelectItem>
                              <SelectItem value="network-engineering">Network Engineering</SelectItem>
                              <SelectItem value="facilities-ops">Facilities Ops</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Request
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
