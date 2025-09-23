'use client';

import * as React from 'react';
import type { Equipment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { handleGetEquipmentInsight } from '../actions';
import { useToast } from '@/hooks/use-toast';

interface AiInsightsClientProps {
  equipment: Equipment[];
}

export function AiInsightsClient({ equipment }: AiInsightsClientProps) {
  const [selectedEquipmentId, setSelectedEquipmentId] = React.useState<string | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [insight, setInsight] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateInsight = async () => {
    if (!selectedEquipmentId) {
      toast({
        variant: 'destructive',
        title: 'No equipment selected',
        description: 'Please select a piece of equipment to generate insights.',
      });
      return;
    }

    const selectedEquipment = equipment.find(e => e.id === selectedEquipmentId);
    if (!selectedEquipment) {
      toast({
        variant: 'destructive',
        title: 'Invalid equipment',
        description: 'The selected equipment could not be found.',
      });
      return;
    }

    setIsLoading(true);
    setInsight(null);
    const result = await handleGetEquipmentInsight(selectedEquipment);

    if (result.success) {
      setInsight(result.data.summary);
    } else {
      toast({
        variant: 'destructive',
        title: 'Insight Generation Failed',
        description: result.error,
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className="flex-1">
        <CardHeader>
          <CardTitle>Equipment Insight Generator</CardTitle>
          <CardDescription>
            Select a piece of equipment to generate an AI-powered summary of its status and health.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select onValueChange={setSelectedEquipmentId} value={selectedEquipmentId}>
              <SelectTrigger className="flex-grow">
                <SelectValue placeholder="Select Equipment..." />
              </SelectTrigger>
              <SelectContent>
                {equipment.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name} ({item.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateInsight} disabled={isLoading || !selectedEquipmentId}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Insight
            </Button>
          </div>
          {insight && (
            <div className="mt-4 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">AI Summary</h4>
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              </div>
            </div>
          )}
           {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Generating AI insight...</p>
              </div>
            )}
        </CardContent>
    </Card>
  );
}
