import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-dev-id="0ur2z0n"
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
