"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Kanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Welcome back! Here are your active boards.
          </p>
        </div>
        <Button className="rounded-xl px-6 py-2.5 bg-blue-600 text-white font-medium shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.5)] transition-all border border-blue-400/20">
          <Plus className="mr-2 h-4 w-4" />
          Create Board
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Placeholder for BoardGrid */}
        <motion.div
          whileHover={{ y: -4 }}
          className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/40 transition-all hover:border-blue-500/50 hover:bg-white/60"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500">
            <Plus size={24} />
          </div>
          <span className="mt-3 text-sm font-medium text-slate-500 group-hover:text-blue-600">
            Create new board
          </span>
        </motion.div>
      </div>
    </div>
  );
}
