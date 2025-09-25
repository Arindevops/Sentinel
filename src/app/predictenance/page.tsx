import { getPredictenanceTasks } from '@/lib/data';
import { PredictenanceClient } from './predictenance-client';

export default async function PredictenancePage() {
  const tasks = await getPredictenanceTasks();

  return (
    <main className="flex flex-1 flex-col space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Predictenance Schedule</h2>
      </div>
      <div className="flex-1">
        <PredictenanceClient tasks={tasks} />
      </div>
    </main>
  );
}
