"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Kanban,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "My Boards",
    url: "/boards",
    icon: Kanban,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-white/20 bg-white/70 backdrop-blur-xl">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
            <Kanban size={18} strokeWidth={2} />
          </div>
          {state === "expanded" && (
            <span className="font-heading text-lg font-semibold tracking-tight text-slate-900">
              KanbanFlow
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "mx-2 rounded-xl transition-all duration-200",
                      pathname === item.url
                        ? "bg-blue-600/10 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon size={18} strokeWidth={1.75} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white/40 py-2 text-slate-500 backdrop-blur-sm transition-all hover:bg-slate-100"
        >
          {state === "expanded" ? (
            <ChevronLeft size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
