"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      data-dev-id="08cif98"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon data-dev-id="08chwpu" className="size-4" />,
        info: <InfoIcon data-dev-id="08chvz4" className="size-4" />,
        warning: <TriangleAlertIcon data-dev-id="08chv8e" className="size-4" />,
        error: <OctagonXIcon data-dev-id="08chuho" className="size-4" />,
        loading: <Loader2Icon data-dev-id="08chtqy" className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props} />
  );
}

export { Toaster }
