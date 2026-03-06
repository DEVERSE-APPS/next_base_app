import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-dev-id="0r9ge9i"
      type={type}
      data-slot="input"
      className={cn(
        "bg-white/40 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none transition-all placeholder:text-slate-400",
        "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Input }
