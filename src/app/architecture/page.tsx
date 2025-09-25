
import { ArchitectureClient } from './architecture-client';

export default function ArchitecturePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex-1 h-[calc(100vh-4rem)]">
        <ArchitectureClient />
      </div>
    </main>
  );
}
