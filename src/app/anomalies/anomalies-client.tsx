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
import { handleCreateIncident } from '@/app/actions';
import { Loader2, PlusCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AnomaliesClientProps {
  anomalies: Anomaly[];
}

const incidentFormSchema = z.object({
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  impact: z.enum(['high', 'medium', 'low']),
});

type IncidentFormValues = z.infer<typeof incidentFormSchema>;


const ClientFormattedDate = ({ timestamp }: { timestamp: string }) => {
    const [formattedDate, setFormattedDate] = React.useState('');
  
    React.useEffect(() => {
      setFormattedDate(format(new Date(timestamp), 'PPpp'));
    }, [timestamp]);
  
    return <>{formattedDate}</>;
};

export function AnomaliesClient({ anomalies }: AnomaliesClientProps) {
  const [incidentAnomaly, setIncidentAnomaly] = React.useState<Anomaly | null>(null);
  const { toast } = useToast();

  const form = useForm<IncidentFormValues>({
    resolver: zodResolver(incidentFormSchema),
    defaultValues: {
      description: '',
      impact: 'medium',
    }
  });

  const { formState: { isSubmitting } } = form;

  const handleCreateIncidentClick = (anomaly: Anomaly) => {
    setIncidentAnomaly(anomaly);
    form.reset({
      description: anomaly.description,
      impact: 'medium', // Default impact
    });
  };

  const handleCloseDialog = () => {
    setIncidentAnomaly(null);
    form.reset();
  };

  const onSubmit = async (values: IncidentFormValues) => {
    if (!incidentAnomaly) return;

    const incidentData = {
      equipmentId: incidentAnomaly.equipmentId,
      equipmentName: incidentAnomaly.equipmentName,
      description: values.description,
      priority: incidentAnomaly.severity,
      impact: values.impact,
    };

    const result = await handleCreateIncident(incidentData);

    if (result.success) {
      toast({
        title: 'Incident Created',
        description: `Incident ${result.data.incidentId} has been successfully created.`,
      });
      handleCloseDialog();
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to Create Incident',
        description: result.error,
      });
    }
  };


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
    <>
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
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>
                    <Badge variant={priorityVariant[anomaly.severity]} className="capitalize">
                      {anomaly.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleCreateIncidentClick(anomaly)}>
                          <PlusCircle className="h-4 w-4" />
                          <span className="sr-only">Create Incident</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create Incident</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={!!incidentAnomaly} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Incident</DialogTitle>
            <DialogDescription>
              Create a new incident for the anomaly on{' '}
              <strong>{incidentAnomaly?.equipmentName}</strong>.
            </DialogDescription>
          </DialogHeader>
          {incidentAnomaly && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                 <div>
                  <Label>Equipment</Label>
                  <p className="text-sm text-muted-foreground">{incidentAnomaly.equipmentName} ({incidentAnomaly.equipmentId})</p>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the issue"
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
                        <Badge variant={priorityVariant[incidentAnomaly.severity]}>
                          {incidentAnomaly.severity}
                        </Badge>
                      </p>
                   </div>

                    <FormField
                      control={form.control}
                      name="impact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impact</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select impact" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
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
                    Create Incident
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
