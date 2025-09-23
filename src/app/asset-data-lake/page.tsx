import { getAssetData } from '@/lib/data';
import { AssetDataLakeClient } from './asset-data-lake-client';

export default async function AssetDataLakePage() {
  const assetData = await getAssetData();

  return (
    <main className="flex flex-1 flex-col space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Asset Data Lake</h2>
      </div>
      <div className="flex-1">
        <AssetDataLakeClient data={assetData} />
      </div>
    </main>
  );
}
