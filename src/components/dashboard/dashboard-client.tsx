'use client';

import type { Anomaly, PredictenanceTask, OverviewData, SensorDataPoint } from '@/lib/types';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { PredictenanceSchedule } from '@/components/dashboard/predictenance-schedule';
import { AnomalyList } from '@/components/dashboard/anomaly-list';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface DashboardClientProps {
    overviewData: OverviewData;
    sensorData: SensorDataPoint[];
    maintenanceTasks: PredictenanceTask[];
    anomalies: Anomaly[];
}

export function DashboardClient({ overviewData, sensorData, maintenanceTasks, anomalies }: DashboardClientProps) {

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <OverviewCards data={overviewData} />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sensor Data</CardTitle>
                            <CardDescription>Live sensor readings from active equipment.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                             <SensorChart data={sensorData} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Predictenance Schedule</CardTitle>
                            <CardDescription>Upcoming predictenance tasks for your fleet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PredictenanceSchedule tasks={maintenanceTasks} />
                        </CardContent>
                    </Card>
                </div>
                 <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Anomalies</CardTitle>
                            <CardDescription>Anomalies detected in the last 72 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AnomalyList anomalies={anomalies} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
