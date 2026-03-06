"use client";

import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { FrostCommandBar } from "./FrostCommandBar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider data-dev-id="0xcsg3z" defaultOpen={true}>
      <div
        data-dev-id="0xcsgup"
        className="flex h-screen w-full overflow-hidden bg-slate-50 font-body">
        <AppSidebar data-dev-id="0xcshlf" />
        <SidebarInset
          data-dev-id="0xcsic5"
          className="flex flex-col overflow-hidden bg-transparent">
          <TopNav data-dev-id="0xcsj2v" />
          <main
            data-dev-id="0xcsjtl"
            className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
            <div data-dev-id="0xcskkb" className="mx-auto w-full max-w-[1600px]">
              {children}
            </div>
          </main>
          <FrostCommandBar data-dev-id="0xct33p" />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
