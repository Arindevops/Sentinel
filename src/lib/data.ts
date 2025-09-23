import type { Equipment, SensorDataPoint, MaintenanceTask, Anomaly, OverviewData } from './types';
import { subDays, format, addDays } from 'date-fns';

const now = new Date();

const equipment: Equipment[] = [
  {
    id: 'EQP-001',
    name: 'CNC Mill A-12',
    status: 'operational',
    location: 'Factory 1, Section A',
    model: 'X-Mill 5000',
    healthScore: 92,
    failurePrediction: 0.05,
    rul: 180,
  },
  {
    id: 'EQP-002',
    name: 'Robotic Arm B-05',
    status: 'warning',
    location: 'Factory 1, Section B',
    model: 'ArmaBot 3',
    healthScore: 65,
    failurePrediction: 0.45,
    rul: 45,
  },
  {
    id: 'EQP-003',
    name: 'Conveyor Belt C-01',
    status: 'operational',
    location: 'Factory 2, Warehouse',
    model: 'SpeedyMover 900',
    healthScore: 98,
    failurePrediction: 0.02,
    rul: 320,
  },
  {
    id: 'EQP-004',
    name: 'Hydraulic Press D-7',
    status: 'failed',
    location: 'Factory 1, Section D',
    model: 'PressMaster Pro',
    healthScore: 10,
    failurePrediction: 0.95,
    rul: 2,
  },
];

const sensorData: SensorDataPoint[] = Array.from({ length: 20 }, (_, i) => ({
  timestamp: format(subDays(now, 19 - i), 'MMM dd'),
  temperature: 75 + Math.sin(i / 3) * 5 + Math.random() * 2,
  pressure: 120 + Math.cos(i / 2) * 10 + Math.random() * 5,
  vibration: 0.5 + Math.sin(i / 5) * 0.2 + Math.random() * 0.1,
}));

const anomalies: Anomaly[] = [
  {
    id: 'ANM-001',
    equipmentId: 'EQP-002',
    equipmentName: 'Robotic Arm B-05',
    timestamp: subDays(now, 2).toISOString(),
    severity: 'high',
    score: 0.89,
    description: 'High vibration and temperature spike detected.',
    sensorReadings: {
      temperature: 95.5,
      pressure: 125.2,
      vibration: 1.2,
    },
    potentialCauses: 'Bearing wear, lubricant failure, motor overload',
  },
  {
    id: 'ANM-002',
    equipmentId: 'EQP-004',
    equipmentName: 'Hydraulic Press D-7',
    timestamp: subDays(now, 1).toISOString(),
    severity: 'medium',
    score: 0.76,
    description: 'Unusual pressure fluctuations.',
    sensorReadings: {
      temperature: 80.1,
      pressure: 150.7,
      vibration: 0.6,
    },
    potentialCauses: 'Hydraulic fluid leak, pump malfunction, seal degradation',
  },
];

const maintenanceTasks: MaintenanceTask[] = [
  {
    id: 'MNT-001',
    equipmentId: 'EQP-002',
    equipmentName: 'Robotic Arm B-05',
    task: 'Inspect and replace bearings',
    dueDate: addDays(now, 7).toISOString(),
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'MNT-002',
    equipmentId: 'EQP-001',
    equipmentName: 'CNC Mill A-12',
    task: 'Quarterly coolant flush',
    dueDate: addDays(now, 14).toISOString(),
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'MNT-003',
    equipmentId: 'EQP-004',
    equipmentName: 'Hydraulic Press D-7',
    task: 'Diagnose and repair failure',
    dueDate: now.toISOString(),
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: 'MNT-004',
    equipmentId: 'EQP-003',
    equipmentName: 'Conveyor Belt C-01',
    task: 'Check belt tension',
    dueDate: addDays(now, 30).toISOString(),
    priority: 'low',
    status: 'pending',
  },
  {
    id: 'MNT-005',
    equipmentId: 'EQP-001',
    equipmentName: 'CNC Mill A-12',
    task: 'Annual software update',
    dueDate: subDays(now, 5).toISOString(),
    priority: 'low',
    status: 'completed',
  },
];

export async function getEquipment(): Promise<Equipment[]> {
  return equipment;
}

export async function getSensorData(): Promise<SensorDataPoint[]> {
  return sensorData;
}

export async function getAnomalies(): Promise<Anomaly[]> {
  return anomalies;
}

export async function getMaintenanceTasks(): Promise<MaintenanceTask[]> {
  return maintenanceTasks;
}

export async function getOverviewData(): Promise<OverviewData> {
  return {
    activeEquipment: equipment.filter((e) => e.status !== 'failed').length,
    anomaliesDetected: anomalies.length,
    pendingMaintenance: maintenanceTasks.filter((t) => t.status === 'pending').length,
    predictedFailures: equipment.filter((e) => e.failurePrediction > 0.75).length,
  };
}
