'use server';

import { analyzeSensorData } from '@/ai/flows/generate-insight-from-data';
import { explainAnomaly } from '@/ai/flows/explain-anomaly';
import type { Anomaly } from '@/lib/types';
import { getEquipmentInsight } from '@/ai/flows/get-equipment-insight';
import type { Equipment } from '@/lib/types';

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
