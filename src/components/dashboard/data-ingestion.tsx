'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { handleFileUpload } from '@/app/actions';
import { Loader2, Upload, FileCheck2 } from 'lucide-react';

export function DataIngestion() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setAnalysisResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select an Excel file to upload.',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result as string;
      const result = await handleFileUpload(base64File);
      if (result.success) {
        setAnalysisResult(result.data.summary);
        toast({
          title: 'Analysis Complete',
          description: 'AI-powered insights have been generated from your data.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: result.error,
        });
      }
      setIsLoading(false);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = (error) => {
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
        });
        setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Ingestion & Analysis</CardTitle>
        <CardDescription>Upload equipment sensor data in Excel format for AI-powered analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} ref={fileInputRef} className="flex-grow"/>
          <Button onClick={handleSubmit} disabled={isLoading || !file}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Analyze
          </Button>
        </div>
        {analysisResult && (
          <div className="mt-4 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <FileCheck2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Analysis Summary</h4>
                <p className="text-sm text-muted-foreground">{analysisResult}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
