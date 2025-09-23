import { getEquipment } from '@/lib/data';
import { AiInsightsClient } from './ai-insights-client';

export default async function AiInsightsPage() {
  const equipment = await getEquipment();

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
      </div>
      <AiInsightsClient equipment={equipment} />
    </main>
  );
}
