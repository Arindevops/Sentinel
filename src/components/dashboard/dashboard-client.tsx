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
            { i: 'overview', x: 0, y: 0, w: 12, h: 1, static: true },
            { i: 'sensor', x: 0, y: 1, w: 7, h: 2.5 },
            { i: 'maintenance', x: 7, y: 1, w: 5, h: 2.5 },
            { i: 'anomalies', x: 0, y: 3.5, w: 7, h: 2.2 },
            { i: 'ingestion', x: 7, y: 3.5, w: 5, h: 2.2 },
        ],
        md: [
            { i: 'overview', x: 0, y: 0, w: 12, h: 1, static: true },
            { i: 'sensor', x: 0, y: 1, w: 7, h: 2.5 },
            { i: 'maintenance', x: 7, y: 1, w: 5, h: 2.5 },
            { i: 'anomalies', x: 0, y: 3.5, w: 7, h: 2.2 },
            { i: 'ingestion', x: 7, y: 3.5, w: 5, h: 2.2 },
        ],
        sm: [
            { i: 'overview', x: 0, y: 0, w: 1, h: 4, static: true },
            { i: 'sensor', x: 0, y: 4, w: 1, h: 3 },
            { i: 'maintenance', x: 0, y: 7, w: 1, h: 3 },
            { i: 'anomalies', x: 0, y: 10, w: 1, h: 3 },
            { i: 'ingestion', x: 0, y: 13, w: 1, h: 3 },
        ]
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
                cols={{ lg: 12, md: 12, sm: 1, xs: 1, xxs: 1 }}
                rowHeight={100}
                containerPadding={[0, 0]}
            >
                <div key="overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <OverviewCards data={overviewData} />
                </div>
                <div key="sensor">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Sensor Data</CardTitle>
                            <CardDescription>Live sensor readings from active equipment.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <SensorChart data={sensorData} />
                        </CardContent>
                    </Card>
                </div>
                <div key="maintenance">
                     <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Maintenance Schedule</CardTitle>
                            <CardDescription>Upcoming maintenance tasks for your fleet.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
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
