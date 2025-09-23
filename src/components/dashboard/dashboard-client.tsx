'use client';

import type { Anomaly, MaintenanceTask, OverviewData, SensorDataPoint } from '@/lib/types';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { MaintenanceSchedule } from '@/components/dashboard/maintenance-schedule';
import { AnomalyList } from '@/components/dashboard/anomaly-list';
import { DataIngestion } from '@/components/dashboard/data-ingestion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface DashboardClientProps {
    overviewData: OverviewData;
    sensorData: SensorDataPoint[];
    maintenanceTasks: MaintenanceTask[];
    anomalies: Anomaly[];
}

export function DashboardClient({ overviewData, sensorData, maintenanceTasks, anomalies }: DashboardClientProps) {

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Widget
                </Button>
            </div>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <OverviewCards data={overviewData} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                            <CardTitle>Maintenance Schedule</CardTitle>
                            <CardDescription>Upcoming maintenance tasks for your fleet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MaintenanceSchedule tasks={maintenanceTasks} />
                        </CardContent>
                    </Card>
                </div>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Anomalies</CardTitle>
                            <CardDescription>Anomalies detected in the last 72 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AnomalyList anomalies={anomalies} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <DataIngestion />
                    </Card>
                </div>
            </div>
        </div>
    );
}
