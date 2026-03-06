import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanbanFlow Pro",
  description: "High-performance visual Kanban application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/__deverse_preload.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-body`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DashboardLayout>
            {children}
          </DashboardLayout>
          <Toaster theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
