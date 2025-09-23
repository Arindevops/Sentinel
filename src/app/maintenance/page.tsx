import { getMaintenanceTasks } from '@/lib/data';
import { MaintenanceClient } from './maintenance-client';

export default async function MaintenancePage() {
  const tasks = await getMaintenanceTasks();

  return (
    <main className="flex flex-1 flex-col space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Maintenance Schedule</h2>
      </div>
      <div className="flex-1">
        <MaintenanceClient tasks={tasks} />
      </div>
    </main>
  );
}
