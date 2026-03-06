"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Download, Settings, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function SettingsModal({ trigger }: { trigger?: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear();
      toast.success("All data cleared successfully");
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = localStorage.getItem("kanban-boards");
    if (!data) {
      toast.error("No data found to export");
      return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanban-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass rounded-3xl border-white/40 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-semibold text-slate-900">Settings</DialogTitle>
          <DialogDescription className="text-slate-500">
            Manage your workspace and data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wider">Data Management</h3>
            <div className="grid gap-3">
              <Button
                variant="outline"
                onClick={handleExportData}
                className="justify-start gap-3 h-12 rounded-xl border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all"
              >
                <Download size={18} />
                <div className="text-left">
                  <div className="font-medium">Export JSON</div>
                  <div className="text-xs text-slate-500">Download all your boards as a JSON file</div>
                </div>
              </Button>
              
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Danger Zone</span>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleClearData}
                  className="w-full justify-start gap-3 h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none transition-all"
                >
                  <Trash2 size={18} />
                  <div className="text-left">
                    <div className="font-medium">Clear All Data</div>
                    <div className="text-xs text-red-500/70">Permanently delete all boards and cards</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
