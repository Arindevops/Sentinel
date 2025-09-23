'use client';

import * as React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Anomaly, MaintenanceTask, OverviewData, SensorDataPoint } from '@/lib/types';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { SensorChart } from '@/components/dashboard/sensor-chart';
import { MaintenanceSchedule } from '@/components/dashboard/maintenance-schedule';
import { AnomalyList } from '@/components/dashboard/anomaly-list';
import { DataIngestion } from '@/components/dashboard/data-ingestion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardClientProps {
    overviewData: OverviewData;
    sensorData: SensorDataPoint[];
    maintenanceTasks: MaintenanceTask[];
    anomalies: Anomaly[];
}

export function DashboardClient({ overviewData, sensorData, maintenanceTasks, anomalies }: DashboardClientProps) {
    const layouts = {
        lg: [
            { i: 'overview', x: 0, y: 0, w: 4, h: 1 },
            { i: 'sensor', x: 0, y: 1, w: 4, h: 2 },
            { i: 'maintenance', x: 4, y: 1, w: 3, h: 2 },
            { i: 'anomalies', x: 0, y: 3, w: 7, h: 2 },
            { i: 'ingestion', x: 4, y: 3, w: 7, h: 2 }
        ],
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Widget
                </Button>
            </div>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 7, md: 7, sm: 1, xs: 1, xxs: 1 }}
                rowHeight={150}
            >
                <div key="overview" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <OverviewCards data={overviewData} />
                </div>
                <div key="sensor">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Sensor Data</CardTitle>
                            <CardDescription>Live sensor readings from active equipment.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SensorChart data={sensorData} />
                        </CardContent>
                    </Card>
                </div>
                <div key="maintenance">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Maintenance Schedule</CardTitle>
                            <CardDescription>Upcoming maintenance tasks for your fleet.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MaintenanceSchedule tasks={maintenanceTasks} />
                        </CardContent>
                    </Card>
                </div>
                <div key="anomalies">
                    <AnomalyList anomalies={anomalies} />
                </div>
                <div key="ingestion">
                    <DataIngestion />
                </div>
            </ResponsiveGridLayout>
        </div>
    );
}
