import {
  getSensorData,
  getPredictenanceTasks,
  getAnomalies,
  getOverviewData,
} from '@/lib/data';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import type { Anomaly, PredictenanceTask, OverviewData, SensorDataPoint } from '@/lib/types';


export default async function DashboardPage() {
  const sensorData: SensorDataPoint[] = await getSensorData();
  const maintenanceTasks: PredictenanceTask[] = await getPredictenanceTasks();
  const anomalies: Anomaly[] = await getAnomalies();
  const overviewData: OverviewData = await getOverviewData();

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <DashboardClient
        overviewData={overviewData}
        sensorData={sensorData}
        maintenanceTasks={maintenanceTasks}
        anomalies={anomalies}
      />
    </main>
  );
}
