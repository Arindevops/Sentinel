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
import { Bot, Compass, Database, LayoutDashboard, Settings, ShieldAlert, Upload, Wrench, Server } from 'lucide-react';
import Link from 'next/link';
import { Header } from './dashboard/header';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const navItems = [
    { href: '/ai-insights', icon: Bot, label: 'AI Insights', tooltip: 'AI Insights' },
    { href: '/anomalies', icon: ShieldAlert, label: 'Anomalies', tooltip: 'Anomalies' },
    { href: '/asset-data-lake', icon: Database, label: 'Asset Data Lake', tooltip: 'Asset Data Lake' },
    { href: '/data-upload', icon: Upload, label: 'Data Upload', tooltip: 'Data Upload' },
    { href: '/equipment', icon: Server, label: 'Equipment', tooltip: 'Equipment' },
    { href: '/predictenance', icon: Wrench, label: 'Predictenance', tooltip: 'Predictenance' },
  ];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 transition-transform duration-300 group-data-[collapsible=icon]:-translate-x-16">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center text-center">
                <Compass className="h-8 w-8 text-primary" />
                <h1 className="text-lg font-semibold text-primary mt-2">Navigation Pane</h1>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Navigation Pane
            </TooltipContent>
          </Tooltip>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/')}
                tooltip="Dashboard"
                className={isActive('/') ? 'bg-accent text-accent-foreground' : ''}
              >
                <Link href="/">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.tooltip}>
                        <Link href={item.href}>
                            <Icon />
                            {item.label}
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
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
