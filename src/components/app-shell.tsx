'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Bot, Database, Factory, LayoutDashboard, Settings, Upload, Wrench, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';
import { Header } from './dashboard/header';
import { usePathname } from 'next/navigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-2 transition-transform duration-300 group-data-[collapsible=icon]:-translate-x-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Factory className="h-6 w-6" />
            </div>
            <h1 className="text-lg font-semibold text-primary">Data Centre Sentinel</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/')} tooltip="Dashboard">
                <Link href="/">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/equipment')} tooltip="Equipment">
                <Link href="/equipment">
                  <Cpu />
                  Equipment
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/anomalies')} tooltip="Anomalies">
                <Link href="/anomalies">
                  <ShieldAlert />
                  Anomalies
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/maintenance')} tooltip="Maintenance">
                <Link href="/maintenance">
                  <Wrench />
                  Maintenance
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/asset-data-lake')} tooltip="Asset Data Lake">
                <Link href="/asset-data-lake">
                  <Database />
                  Asset Data Lake
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/data-upload')} tooltip="Data Upload">
                    <Link href="/data-upload">
                        <Upload />
                        Data Upload
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/ai-insights')} tooltip="AI Insights">
                <Link href="/ai-insights">
                  <Bot />
                  AI Insights
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="#">
                  <Settings />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
