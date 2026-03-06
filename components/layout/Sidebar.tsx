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
    <Sidebar
      data-dev-id="0qr9g4y"
      collapsible="icon"
      className="border-r border-white/20 bg-white/70 backdrop-blur-xl">
      <SidebarHeader data-dev-id="0qr9fe8" className="p-4">
        <div data-dev-id="0qr9eni" className="flex items-center gap-3 px-2">
          <div
            data-dev-id="0qr9dws"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
            <Kanban data-dev-id="0qr9d62" size={18} strokeWidth={2} />
          </div>
          {state === "expanded" && (
            <span
              data-dev-id="0qr9axy"
              className="font-heading text-lg font-semibold tracking-tight text-slate-900">
              KanbanFlow
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent data-dev-id="0qr8qx6">
        <SidebarGroup data-dev-id="0qr8q6g">
          <SidebarGroupLabel
            data-dev-id="0qr8pfq"
            className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent data-dev-id="0qr87n1">
            <SidebarMenu data-dev-id="0mxappg">
              {items.map((item) => (
                <SidebarMenuItem data-dev-id="0mxbzoj" key={item.title}>
                  <SidebarMenuButton
                    data-dev-id="0mxcmo3"
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "mx-2 rounded-xl transition-all duration-200",
                      pathname === item.url
                        ? "bg-blue-600/10 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100"
                    )}>
                    <Link data-dev-id="0mxx290" href={item.url}>
                      <item.icon data-dev-id="0mxxp8k" size={18} strokeWidth={1.75} />
                      <span data-dev-id="0mxyc84">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter data-dev-id="0myhhtz" className="p-4">
        <button
          data-dev-id="0myi4tj"
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white/40 py-2 text-slate-500 backdrop-blur-sm transition-all hover:bg-slate-100">
          {state === "expanded" ? (
            <ChevronLeft data-dev-id="02huuyf" size={18} />
          ) : (
            <ChevronRight data-dev-id="02htkzc" size={18} />
          )}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
