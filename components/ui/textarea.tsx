import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-dev-id="04yw6d2"
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-xl border border-slate-200 bg-white/40 backdrop-blur-sm px-4 py-2 text-sm outline-none transition-all placeholder:text-slate-400",
        "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Textarea }
