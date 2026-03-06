"use client";

import * as React from "react";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function TopNav() {
  const { theme, setTheme } = useTheme();

  return (
    <header
      data-dev-id="09kx2xe"
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/20 bg-white/70 px-6 backdrop-blur-xl">
      <div data-dev-id="09kx26o" className="flex items-center gap-4">
        <div data-dev-id="09kx1fy" className="relative hidden md:block">
          <Search
            data-dev-id="09kx0p8"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            data-dev-id="09kwzyi"
            type="text"
            placeholder="Search boards..."
            className="h-10 w-64 rounded-xl border border-slate-200 bg-white/40 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white/60 placeholder:text-slate-400" />
        </div>
      </div>
      <div data-dev-id="09kwegc" className="flex items-center gap-3">
        <motion.div
          data-dev-id="09kwar0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Button
            data-dev-id="09kwdpm"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl text-slate-600 hover:bg-white/50">
            <Sun
              data-dev-id="09kvtou"
              className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon
              data-dev-id="09kvsy4"
              className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span data-dev-id="09kvs7e" className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>

        <motion.div
          data-dev-id="09kv300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <Button
            data-dev-id="0cuv5nl"
            variant="ghost"
            size="icon"
            className="rounded-xl text-slate-600 hover:bg-white/50">
            <Bell data-dev-id="0cuejzu" className="h-5 w-5" />
          </Button>
        </motion.div>

        <DropdownMenu data-dev-id="0cucn18">
          <DropdownMenuTrigger data-dev-id="0cuc01o" asChild>
            <motion.div
              data-dev-id="09kuej2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Button
                data-dev-id="0cubd24"
                variant="ghost"
                className="relative h-10 w-10 rounded-xl p-0 hover:bg-white/50">
                <Avatar
                  data-dev-id="0cu8t3z"
                  className="h-10 w-10 rounded-xl border border-white/40 shadow-sm">
                  <AvatarImage data-dev-id="0cturec" src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback data-dev-id="0ctu4es" className="rounded-xl bg-blue-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            data-dev-id="0ctqahl"
            align="end"
            className="w-56 rounded-xl border-white/20 bg-white/80 backdrop-blur-xl">
            <DropdownMenuLabel data-dev-id="0ctpni1" className="font-heading font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator data-dev-id="0ctabsr" className="bg-slate-200" />
            <DropdownMenuItem
              data-dev-id="0ct9ot7"
              className="rounded-lg focus:bg-blue-600/10 focus:text-blue-600">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              data-dev-id="0ct7rul"
              className="rounded-lg focus:bg-blue-600/10 focus:text-blue-600">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator data-dev-id="0ct5uvz" className="bg-slate-200" />
            <DropdownMenuItem
              data-dev-id="0ct57wf"
              className="rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
