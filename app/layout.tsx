import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StorageInitializer } from "@/components/StorageInitializer";

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
    <html data-dev-id="0ka1zm6" lang="en" suppressHydrationWarning>
      <head data-dev-id="0ka1yvg">
        <script data-dev-id="0ka1y4q" src="/__deverse_preload.js"></script>
      </head>
      <body
        data-dev-id="0ka1wnb"
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-body`}>
        <ThemeProvider
          data-dev-id="0ka1eum"
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <DashboardLayout data-dev-id="0ka1aef">
            <StorageInitializer data-dev-id="0ka18x6" />
            {children}
          </DashboardLayout>
          <Toaster data-dev-id="0ka0slq" theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
