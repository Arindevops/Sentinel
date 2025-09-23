import {
  getEquipment,
  getSensorData,
  getMaintenanceTasks,
  getAnomalies,
  getOverviewData,
} from '@/lib/data';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { MaintenanceSchedule } from '@/components/dashboard/maintenance-schedule';
import { AnomalyList } from '@/components/dashboard/anomaly-list';
import { DataIngestion } from '@/components/dashboard/data-ingestion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function DashboardPage() {
  const sensorData = await getSensorData();
  const maintenanceTasks = await getMaintenanceTasks();
  const anomalies = await getAnomalies();
  const overviewData = await getOverviewData();

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards data={overviewData} />
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sensor Data</CardTitle>
            <CardDescription>Live sensor readings from active equipment.</CardDescription>
          </CardHeader>
          <CardContent>
            <SensorChart data={sensorData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Upcoming maintenance tasks for your fleet.</CardDescription>
          </CardHeader>
          <CardContent>
            <MaintenanceSchedule tasks={maintenanceTasks} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnomalyList anomalies={anomalies} />
        <DataIngestion />
      </div>
    </main>
  );
}
