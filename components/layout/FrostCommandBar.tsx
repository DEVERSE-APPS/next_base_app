"use client";

import * as React from "react";
import { Search, Command, Plus, Settings, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FrostCommandBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      data-dev-id="0gans75"
      className="fixed bottom-8 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
      <motion.div
        data-dev-id="0gansxv"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="group relative flex h-14 w-full items-center gap-3 rounded-2xl border border-white/50 bg-white/40 px-4 shadow-2xl backdrop-blur-2xl transition-all hover:border-blue-500/30">
        <div
          data-dev-id="0ganxe2"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
          <Command data-dev-id="0gany4s" size={16} strokeWidth={2} />
        </div>
        
        <input
          data-dev-id="0gaofxh"
          type="text"
          placeholder="Type a command or search..."
          className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)} />

        <div data-dev-id="0gap1fn" className="flex items-center gap-2">
          <kbd
            data-dev-id="0gap26d"
            className="hidden h-6 items-center gap-1 rounded border border-slate-200 bg-white/50 px-1.5 font-mono text-[10px] font-medium text-slate-500 sm:flex">
            <span data-dev-id="0gap2x3" className="text-xs">⌘</span>K
          </kbd>
          
          <div data-dev-id="0gap557" className="h-6 w-px bg-slate-200" />
          
          <button
            data-dev-id="0gap6mm"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600">
            <Plus data-dev-id="07zwyh5" size={18} />
          </button>
          <button
            data-dev-id="080bn6b"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600">
            <Settings data-dev-id="080ca5v" size={18} />
          </button>
        </div>

        {/* Subtle glow effect */}
        <div
          data-dev-id="080fh3j"
          className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}
