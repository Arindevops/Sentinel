'use client';

import * as React from 'react';
import type { Anomaly } from '@/lib/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { AlertTriangle, FileQuestion, Loader2 } from 'lucide-react';
import { getAnomalyExplanation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface AnomalyListProps {
  anomalies: Anomaly[];
}

const ClientFormattedDate = ({ timestamp }: { timestamp: string }) => {
  const [formattedDate, setFormattedDate] = React.useState('');

  React.useEffect(() => {
    setFormattedDate(format(new Date(timestamp), 'PPpp'));
  }, [timestamp]);

  return <>{formattedDate}</>;
};

export function AnomalyList({ anomalies }: AnomalyListProps) {
  const [selectedAnomaly, setSelectedAnomaly] = React.useState<Anomaly | null>(null);
  const [explanation, setExplanation] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleExplainClick = async (anomaly: Anomaly) => {
    setSelectedAnomaly(anomaly);
    setIsLoading(true);
    setExplanation(null);
    const result = await getAnomalyExplanation(anomaly);
    if (result.success) {
      setExplanation(result.data.explanation);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      setSelectedAnomaly(null);
    }
    setIsLoading(false);
  };

  const priorityVariant: Record<Anomaly['severity'], 'destructive' | 'secondary' | 'default'> = {
    high: 'destructive',
    medium: 'secondary',
    low: 'default',
  };

  return (
    <>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <div key={anomaly.id} className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-destructive mr-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {anomaly.equipmentName}
                </p>
                <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                <p className="text-xs text-muted-foreground">
                  <ClientFormattedDate timestamp={anomaly.timestamp} />
                </p>
              </div>
               <Badge variant={priorityVariant[anomaly.severity]} className="capitalize mr-4">
                {anomaly.severity}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => handleExplainClick(anomaly)}>
                <FileQuestion className="h-4 w-4" />
                <span className="sr-only">Explain Anomaly</span>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedAnomaly} onOpenChange={(open) => !open && setSelectedAnomaly(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anomaly Explanation</DialogTitle>
            <DialogDescription>
              AI-generated explanation for the anomaly on{' '}
              {selectedAnomaly?.equipmentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {explanation && <p>{explanation}</p>}
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedAnomaly(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
