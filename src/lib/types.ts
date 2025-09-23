export type Equipment = {
  id: string;
  name: string;
  status: 'operational' | 'warning' | 'failed';
  location: string;
  model: string;
  healthScore: number;
  failurePrediction: number; // probability
  rul: number; // remaining useful life in days
};

export type SensorDataPoint = {
  timestamp: string;
  temperature: number;
  pressure: number;
  vibration: number;
};

export type Anomaly = {
  id: string;
  equipmentId: string;
  equipmentName: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  score: number;
  description: string;
  sensorReadings: {
    temperature: number;
    pressure: number;
    vibration: number;
  };
  potentialCauses: string;
};

export type MaintenanceTask = {
  id: string;
  equipmentId: string;
  equipmentName: string;
  task: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
};

export type OverviewData = {
  activeEquipment: number;
  anomaliesDetected: number;
  pendingMaintenance: number;
  predictedFailures: number;
};
