// This file uses server-side code.
'use server';

/**
 * @fileOverview Explains detected anomalies, providing sensor readings and potential causes.
 *
 * - explainAnomaly - A function that explains why an anomaly was flagged.
 * - ExplainAnomalyInput - The input type for the explainAnomaly function.
 * - ExplainAnomalyOutput - The return type for the explainAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAnomalyInputSchema = z.object({
  sensorReadings: z.record(z.string(), z.number()).describe('The sensor readings that triggered the anomaly. A map of sensor names to their values.'),
  anomalyScore: z.number().describe('The anomaly score calculated for the sensor readings.'),
  potentialCauses: z.string().describe('List of potential causes derived from system failures'),
});
export type ExplainAnomalyInput = z.infer<typeof ExplainAnomalyInputSchema>;

const ExplainAnomalyOutputSchema = z.object({
  explanation: z.string().describe('A brief explanation of why the anomaly was flagged, including the specific sensor readings and potential causes.'),
});
export type ExplainAnomalyOutput = z.infer<typeof ExplainAnomalyOutputSchema>;

export async function explainAnomaly(input: ExplainAnomalyInput): Promise<ExplainAnomalyOutput> {
  return explainAnomalyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAnomalyPrompt',
  input: {schema: ExplainAnomalyInputSchema},
  output: {schema: ExplainAnomalyOutputSchema},
  prompt: `You are an expert in industrial equipment monitoring and anomaly detection.

  You have detected an anomaly in the equipment's sensor readings. The anomaly score is {{anomalyScore}}.

The specific sensor readings that triggered the anomaly are:

{{#each sensorReadings}}
  - {{key}}: {{value}}
{{/each}}

Potential causes include: {{potentialCauses}}

Based on this information, provide a brief explanation of why the anomaly was flagged. Be concise.
`,
});

const explainAnomalyFlow = ai.defineFlow(
  {
    name: 'explainAnomalyFlow',
    inputSchema: ExplainAnomalyInputSchema,
    outputSchema: ExplainAnomalyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
