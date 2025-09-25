'use server';

import { analyzeSensorData } from '@/ai/flows/generate-insight-from-data';
import { explainAnomaly } from '@/ai/flows/explain-anomaly';
import type { Anomaly } from '@/lib/types';
import { getEquipmentInsight } from '@/ai/flows/get-equipment-insight';
import type { Equipment } from '@/lib/types';
import { z } from 'zod';

export async function handleFileUpload(fileContent: string) {
  try {
    const result = await analyzeSensorData({ excelDataUri: fileContent });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error analyzing sensor data:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to analyze data: ${errorMessage}` };
  }
}

export async function getAnomalyExplanation(anomaly: Anomaly) {
  try {
    const result = await explainAnomaly({
      sensorReadings: anomaly.sensorReadings,
      anomalyScore: anomaly.score,
      potentialCauses: anomaly.potentialCauses,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error explaining anomaly:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to get explanation: ${errorMessage}` };
  }
}

export async function handleGetEquipmentInsight(equipment: Equipment) {
  try {
    const result = await getEquipmentInsight({ equipment });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting equipment insight:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to get insight: ${errorMessage}` };
  }
}

const incidentSchema = z.object({
  equipmentId: z.string(),
  equipmentName: z.string(),
  description: z.string(),
  priority: z.string(),
  impact: z.string(),
});

export async function handleCreateIncident(data: unknown) {
  try {
    const validatedData = incidentSchema.parse(data);

    // TODO: Replace with your actual incident management tool API call
    console.log('Creating incident with data:', validatedData);
    // const response = await fetch('https://your.incident.api/incidents', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
    //   body: JSON.stringify(validatedData),
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to create incident in the management tool');
    // }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, data: { incidentId: `INC-${Date.now()}` } };
  } catch (error) {
    console.error('Error creating incident:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to create incident: ${errorMessage}` };
  }
}


const changeRequestSchema = z.object({
  configurationItem: z.string(),
  description: z.string(),
  priority: z.string(),
  scheduleDate: z.string(),
  assignmentGroup: z.string(),
});

export async function handleCreateChangeRequest(data: unknown) {
  try {
    const validatedData = changeRequestSchema.parse(data);

    // TODO: Replace with your actual change management tool API call
    console.log('Creating change request with data:', validatedData);
    // const response = await fetch('https://your.change.api/changes', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
    //   body: JSON.stringify(validatedData),
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to create change request in the management tool');
    // }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, data: { changeId: `CHG-${Date.now()}` } };
  } catch (error) {
    console.error('Error creating change request:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to create change request: ${errorMessage}` };
  }
}