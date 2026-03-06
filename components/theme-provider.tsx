"use strict";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider data-dev-id="0oyskaa" {...props}>{children}</NextThemesProvider>;
}
