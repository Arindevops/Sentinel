'use server';

/**
 * @fileOverview This file defines a Genkit flow to analyze equipment sensor data from an Excel file
 * and generate insights about potential issues or anomalies.
 *
 * @exports analyzeSensorData - A function that takes Excel data as input and returns a summary of potential issues.
 * @exports AnalyzeSensorDataInput - The input type for the analyzeSensorData function.
 * @exports AnalyzeSensorDataOutput - The return type for the analyzeSensorData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSensorDataInputSchema = z.object({
  excelDataUri: z
    .string()
    .describe(
      "An Excel file containing equipment sensor data, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeSensorDataInput = z.infer<typeof AnalyzeSensorDataInputSchema>;

const AnalyzeSensorDataOutputSchema = z.object({
  summary: z.string().describe('A summary of potential issues or anomalies detected in the sensor data.'),
});
export type AnalyzeSensorDataOutput = z.infer<typeof AnalyzeSensorDataOutputSchema>;

export async function analyzeSensorData(input: AnalyzeSensorDataInput): Promise<AnalyzeSensorDataOutput> {
  return analyzeSensorDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSensorDataPrompt',
  input: {schema: AnalyzeSensorDataInputSchema},
  output: {schema: AnalyzeSensorDataOutputSchema},
  prompt: `You are an expert in analyzing equipment sensor data to identify potential issues and anomalies.

You are provided with an Excel file containing sensor data. Analyze the data and provide a summary of any potential issues or anomalies you detect. Explain the found issue, and the root cause of the issue.

Use the following data for your analysis:

Excel Data: {{media url=excelDataUri}}`,
});

const analyzeSensorDataFlow = ai.defineFlow(
  {
    name: 'analyzeSensorDataFlow',
    inputSchema: AnalyzeSensorDataInputSchema,
    outputSchema: AnalyzeSensorDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
