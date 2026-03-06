"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateBoardModalProps {
  onCreate: (title: string, background: string) => void;
  trigger?: React.ReactNode;
}

const BACKGROUND_OPTIONS = [
  { id: "blue", value: "bg-blue-600" },
  { id: "indigo", value: "bg-indigo-600" },
  { id: "slate", value: "bg-slate-800" },
  { id: "emerald", value: "bg-emerald-600" },
  { id: "rose", value: "bg-rose-600" },
  { id: "amber", value: "bg-amber-600" },
  { id: "unsplash1", value: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: "unsplash2", value: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop" },
  { id: "unsplash3", value: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2670&auto=format&fit=crop" },
];

export function CreateBoardModal({ onCreate, trigger }: CreateBoardModalProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [selectedBackground, setSelectedBackground] = React.useState(BACKGROUND_OPTIONS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title, selectedBackground);
    setTitle("");
    setSelectedBackground(BACKGROUND_OPTIONS[0].value);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            data-testid="create-board-trigger"
            className="rounded-xl px-6 py-2.5 bg-blue-600 text-white font-medium shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.5)] transition-all border border-blue-400/20">
            <Plus className="mr-2 h-4 w-4" />
            Create Board
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
            Create New Board
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-600">Board Title</Label>
            <Input
              id="title"
              placeholder="Enter board title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/40 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-600">Background</Label>
            <div className="grid grid-cols-3 gap-2">
              {BACKGROUND_OPTIONS.map((option) => {
                const isColor = option.value.startsWith("bg-");
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedBackground(option.value)}
                    className={cn(
                      "relative aspect-video w-full overflow-hidden rounded-lg border-2 transition-all",
                      selectedBackground === option.value
                        ? "border-blue-600 ring-2 ring-blue-600/20"
                        : "border-transparent hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "h-full w-full",
                        isColor ? option.value : "bg-cover bg-center"
                      )}
                      style={!isColor ? { backgroundImage: `url(${option.value})` } : {}}
                    />
                    {selectedBackground === option.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              data-testid="create-board-submit"
              disabled={!title.trim()}
              className="w-full rounded-xl px-6 py-2.5 bg-blue-600 text-white font-medium shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.5)] transition-all border border-blue-400/20"
            >
              Create Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
