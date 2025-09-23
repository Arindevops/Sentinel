import { getEquipment } from '@/lib/data';
import { EquipmentClient } from './equipment-client';

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams?: {
    risk?: string;
  };
}) {
  const allEquipment = await getEquipment();
  const riskFilter = searchParams?.risk;
  
  const equipment = riskFilter === 'high' 
    ? allEquipment.filter(e => e.failurePrediction > 0.75) 
    : allEquipment;

  return (
    <main className="flex flex-1 flex-col space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{riskFilter === 'high' ? 'High Risk Equipment' : 'All Equipment'}</h2>
      </div>
      <div className="flex-1">
        <EquipmentClient equipment={equipment} />
      </div>
    </main>
  );
}
