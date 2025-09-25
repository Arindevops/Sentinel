
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { handleFileUpload } from '@/app/actions';
import { Loader2, Upload, FileCheck2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DataUploadClient() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<string | undefined>();
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

    if (!category) {
        toast({
            variant: 'destructive',
            title: 'No category selected',
            description: 'Please select a data category.',
        });
        return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result as string;
      // TODO: Pass category to the handler when the API supports it.
      const result = await handleFileUpload(base64File);
      if (result.success) {
        setAnalysisResult(result.data.summary);
        toast({
          title: 'Analysis Complete',
          description: `AI-powered insights have been generated for your data in the "${category}" category.`,
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
      setCategory(undefined);
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
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input type="file" accept=".xlsx, .xls" onChange={handleFileChange} ref={fileInputRef} className="flex-grow"/>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="sm:w-[280px]">
                <SelectValue placeholder="Select data category..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Sensor Data Info">Sensor Data Info</SelectItem>
                <SelectItem value="Equipment maintenance history">Equipment maintenance history</SelectItem>
                <SelectItem value="Previous incidents Assets">Previous incidents Assets</SelectItem>
                <SelectItem value="Previous changes on Assets">Previous changes on Assets</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} disabled={isLoading || !file || !category} className="sm:w-auto">
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
         {isLoading && !analysisResult && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Analyzing your data...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
