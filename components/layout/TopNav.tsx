"use client";

import * as React from "react";
import { Search, Bell, User, Moon, Sun } from "lucide-react";
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

export function TopNav() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/20 bg-white/70 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search boards..."
            className="h-10 w-64 rounded-xl border border-slate-200 bg-white/40 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl text-slate-600 hover:bg-slate-100"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl text-slate-600 hover:bg-slate-100"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-xl p-0 hover:bg-slate-100"
            >
              <Avatar className="h-10 w-10 rounded-xl border border-white/40 shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="rounded-xl bg-blue-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-white/20 bg-white/80 backdrop-blur-xl">
            <DropdownMenuLabel className="font-heading font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem className="rounded-lg focus:bg-blue-600/10 focus:text-blue-600">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg focus:bg-blue-600/10 focus:text-blue-600">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem className="rounded-lg text-red-600 focus:bg-red-50 focus:text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
