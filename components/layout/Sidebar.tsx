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
import { motion, AnimatePresence } from "framer-motion";
import { SettingsModal } from "@/components/SettingsModal";

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
          <motion.div
            data-dev-id="0qr9dws"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
            <Kanban data-dev-id="0qr9d62" size={18} strokeWidth={2} />
          </motion.div>
          <AnimatePresence data-dev-id="0qr8q6n">
            {state === "expanded" && (
              <motion.span
                data-dev-id="0qr9axy"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-heading text-lg font-semibold tracking-tight text-slate-900">
                KanbanFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>
      <SidebarContent data-dev-id="0qr8qx6">
        <SidebarGroup data-dev-id="0qr8q6g">
          <SidebarGroupLabel
            data-dev-id="0qr8pfq"
            className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent data-dev-id="0qr8p2r">
            <SidebarMenu data-dev-id="0qr8o9y">
              {items.map((item) => (
                <SidebarMenuItem data-dev-id="0qr8n6r" key={item.title}>
                  <SidebarMenuButton
                    data-dev-id="0qr8m3r"
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200",
                      pathname === item.url
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-slate-600 hover:bg-slate-100/50"
                    )}>
                    <Link data-dev-id="0qr8l0r" href={item.url}>
                      <item.icon data-dev-id="0qr8k7r" />
                      <span data-dev-id="0mtz6xd">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem data-dev-id="0qr8n6s">
                <SettingsModal
                  trigger={
                    <SidebarMenuButton
                      data-dev-id="0qr8m3s"
                      tooltip="Settings"
                      className="text-slate-600 hover:bg-slate-100/50 transition-all duration-200"
                    >
                      <Settings data-dev-id="0qr8k7s" />
                      <span data-dev-id="0mtz6xe">Settings</span>
                    </SidebarMenuButton>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter data-dev-id="0qr7j6r" className="p-4">
        <SidebarMenuButton
          data-dev-id="0qr7i3r"
          onClick={() => toggleSidebar()}
          className="w-full justify-center text-slate-500 hover:text-slate-900">
          {state === "expanded" ? (
            <ChevronLeft data-dev-id="0qr7h0r" size={18} />
          ) : (
            <ChevronRight data-dev-id="0qr7g7r" size={18} />
          )}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
