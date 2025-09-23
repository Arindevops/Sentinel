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
import { cn } from '@/lib/utils';

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
            { i: 'overview', x: 0, y: 0, w: 12, h: 1.2, static: true },
            { i: 'sensor', x: 0, y: 1, w: 7, h: 3 },
            { i: 'maintenance', x: 7, y: 1, w: 5, h: 3 },
            { i: 'anomalies', x: 0, y: 4, w: 7, h: 2.5 },
            { i: 'ingestion', x: 7, y: 4, w: 5, h: 2.5 },
        ],
        md: [
            { i: 'overview', x: 0, y: 0, w: 12, h: 1.2, static: true },
            { i: 'sensor', x: 0, y: 1, w: 7, h: 3 },
            { i: 'maintenance', x: 7, y: 1, w: 5, h: 3 },
            { i: 'anomalies', x: 0, y: 4, w: 7, h: 2.5 },
            { i: 'ingestion', x: 7, y: 4, w: 5, h: 2.5 },
        ],
        sm: [
            { i: 'overview', x: 0, y: 0, w: 1, h: 4.5, static: true },
            { i: 'sensor', x: 0, y: 4.5, w: 1, h: 3 },
            { i: 'maintenance', x: 0, y: 7.5, w: 1, h: 3 },
            { i: 'anomalies', x: 0, y: 10.5, w: 1, h: 2.5 },
            { i: 'ingestion', x: 0, y: 13, w: 1, h: 2.5 },
        ]
    };

    const gridItemClasses = "h-full w-full";

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
                containerPadding={[16, 16]}
                margin={[16, 16]}
            >
                <div key="overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <OverviewCards data={overviewData} />
                </div>
                <div key="sensor" className={cn(gridItemClasses)}>
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
                <div key="maintenance" className={cn(gridItemClasses)}>
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
                <div key="anomalies" className={cn(gridItemClasses)}>
                    <AnomalyList anomalies={anomalies} />
                </div>
                <div key="ingestion" className={cn(gridItemClasses)}>
                    <DataIngestion />
                </div>
            </ResponsiveGridLayout>
        </div>
    );
}
