"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { FrostCommandBar } from "./FrostCommandBar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-body">
        <AppSidebar />
        <SidebarInset className="flex flex-col overflow-hidden bg-transparent">
          <TopNav />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-[1600px]">
              {children}
            </div>
          </main>
          <FrostCommandBar />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
