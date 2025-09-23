'use server';

/**
 * @fileOverview Generates an insight for a specific piece of equipment.
 *
 * - getEquipmentInsight - A function that provides a summary for a piece of equipment.
 * - GetEquipmentInsightInput - The input type for the getEquipmentInsight function.
 * - GetEquipmentInsightOutput - The return type for the getEquipmentInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EquipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['operational', 'warning', 'failed']),
  location: z.string(),
  model: z.string(),
  healthScore: z.number(),
  failurePrediction: z.number(),
  rul: z.number().describe('Remaining useful life in days'),
});

const GetEquipmentInsightInputSchema = z.object({
  equipment: EquipmentSchema,
});
export type GetEquipmentInsightInput = z.infer<typeof GetEquipmentInsightInputSchema>;

const GetEquipmentInsightOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the equipment status, health, and potential issues.'),
});
export type GetEquipmentInsightOutput = z.infer<typeof GetEquipmentInsightOutputSchema>;

export async function getEquipmentInsight(input: GetEquipmentInsightInput): Promise<GetEquipmentInsightOutput> {
  return getEquipmentInsightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getEquipmentInsightPrompt',
  input: {schema: GetEquipmentInsightInputSchema},
  output: {schema: GetEquipmentInsightOutputSchema},
  prompt: `You are an expert in industrial equipment monitoring and predictive maintenance.

  Analyze the following equipment data and provide a concise summary of its status, health, and potential issues.

  Equipment Name: {{equipment.name}}
  Status: {{equipment.status}}
  Location: {{equipment.location}}
  Model: {{equipment.model}}
  Health Score: {{equipment.healthScore}}
  Failure Prediction: {{equipment.failurePrediction}}
  Remaining Useful Life (RUL): {{equipment.rul}} days

  Based on this information, generate a summary. If the health score is low, the failure prediction is high, or the status is not operational, highlight the potential risks.
`,
});

const getEquipmentInsightFlow = ai.defineFlow(
  {
    name: 'getEquipmentInsightFlow',
    inputSchema: GetEquipmentInsightInputSchema,
    outputSchema: GetEquipmentInsightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
