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
    <Dialog data-dev-id="0jemh2d" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger data-dev-id="0jemgbn" asChild>
        {trigger || (
          <Button data-dev-id="0jelz9n" variant="ghost" size="icon">
            <Settings data-dev-id="0jelyix" size={20} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        data-dev-id="0jelvk4"
        className="sm:max-w-[425px] glass rounded-3xl border-white/40 shadow-2xl">
        <DialogHeader data-dev-id="0jelute">
          <DialogTitle
            data-dev-id="0jelu2o"
            className="font-heading text-2xl font-semibold text-slate-900">Settings</DialogTitle>
          <DialogDescription data-dev-id="0jeltby" className="text-slate-500">
            Manage your workspace and data.
          </DialogDescription>
        </DialogHeader>
        <div data-dev-id="0jelask" className="grid gap-6 py-4">
          <div data-dev-id="0jela1u" className="space-y-4">
            <h3
              data-dev-id="0xbekxz"
              className="text-sm font-medium text-slate-900 uppercase tracking-wider">Data Management</h3>
            <div data-dev-id="0xbdxyf" className="grid gap-3">
              <Button
                data-dev-id="0xbdayv"
                variant="outline"
                onClick={handleExportData}
                className="justify-start gap-3 h-12 rounded-xl border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-all">
                <Download data-dev-id="0xawpb4" size={18} />
                <div data-dev-id="0xaw2bk" className="text-left">
                  <div data-dev-id="0xavfc0" className="font-medium">Export JSON</div>
                  <div data-dev-id="0xauscg" className="text-xs text-slate-500">Download all your boards as a JSON file</div>
                </div>
              </Button>
              
              <div data-dev-id="0xas8eb" className="pt-4 border-t border-slate-100">
                <div
                  data-dev-id="0xarler"
                  className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertTriangle data-dev-id="0xadjp4" size={16} />
                  <span
                    data-dev-id="0xacwoz"
                    className="text-xs font-semibold uppercase tracking-wider">Danger Zone</span>
                </div>
                <Button
                  data-dev-id="0xabmpw"
                  variant="destructive"
                  onClick={handleClearData}
                  className="w-full justify-start gap-3 h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none transition-all">
                  <Trash2 data-dev-id="0xa8fs8" size={18} />
                  <div data-dev-id="0xa7sso" className="text-left">
                    <div data-dev-id="0x9tr31" className="font-medium">Clear All Data</div>
                    <div data-dev-id="0x9t43h" className="text-xs text-red-500/70">Permanently delete all boards and cards</div>
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
