
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
import { Bot, Database, Cpu, LayoutDashboard, Settings, ShieldAlert, Upload, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Header } from './dashboard/header';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { href: '/ai-insights', icon: Bot, label: 'AI Insights', tooltip: 'AI Insights' },
  { href: '/anomalies', icon: ShieldAlert, label: 'Anomalies', tooltip: 'Anomalies' },
  { href: '/asset-data-lake', icon: Database, label: 'Asset Data Lake', tooltip: 'Asset Data Lake' },
  { href: '/data-upload', icon: Upload, label: 'Data Upload', tooltip: 'Data Upload' },
  { href: '/equipment', icon: Cpu, label: 'Equipment', tooltip: 'Equipment' },
  { href: '/maintenance', icon: Wrench, label: 'Maintenance', tooltip: 'Maintenance' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 transition-transform duration-300 group-data-[collapsible=icon]:-translate-x-16">
          <h1 className="text-lg font-semibold text-primary">Navigation Pane</h1>
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
