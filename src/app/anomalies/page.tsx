import { getAnomalies } from '@/lib/data';
import { AnomaliesClient } from './anomalies-client';

export default async function AnomaliesPage() {
  const anomalies = await getAnomalies();

  return (
    <main className="flex flex-1 flex-col space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">All Anomalies</h2>
      </div>
      <div className="flex-1">
        <AnomaliesClient anomalies={anomalies} />
      </div>
    </main>
  );
}
