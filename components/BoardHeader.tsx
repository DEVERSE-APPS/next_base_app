"use client";

import { useState, useEffect, useRef } from "react";
import { Board } from "@/types/kanban";
import { Star, MoreHorizontal, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BoardHeaderProps {
  board: Board;
  onUpdateBoard: (updates: Partial<Board>) => void;
  filterLabel: string | null;
  onFilterChange: (label: string | null) => void;
}

export function BoardHeader({ board, onUpdateBoard, filterLabel, onFilterChange }: BoardHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() && title !== board.title) {
      onUpdateBoard({ title: title.trim() });
    } else {
      setTitle(board.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setTitle(board.title);
    }
  };

  return (
    <motion.div
      data-dev-id="0vie64r"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8 p-4 glass rounded-2xl shadow-sm">
      <div data-dev-id="0vie6vh" className="flex items-center gap-4">
        {isEditing ? (
          <Input
            data-dev-id="0vie8cw"
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="h-9 text-xl font-semibold font-heading bg-white/50 backdrop-blur-sm border-blue-500/50 w-auto min-w-[200px] rounded-xl"
          />
        ) : (
          <h1
            data-dev-id="0vieulr"
            onClick={() => setIsEditing(true)}
            className="text-2xl font-semibold font-heading text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
            {board.title}
          </h1>
        )}
        <Button
          data-dev-id="0viev6r"
          variant="ghost"
          size="icon"
          onClick={() => onUpdateBoard({ isStarred: !board.isStarred })}
          className={cn(
            "rounded-full transition-all",
            board.isStarred ? "text-yellow-400 hover:text-yellow-500" : "text-slate-400 hover:text-slate-600"
          )}>
          <Star
            data-dev-id="0vievjr"
            size={20}
            fill={board.isStarred ? "currentColor" : "none"}
            className={cn(board.isStarred && "animate-in zoom-in duration-300")}
          />
        </Button>
      </div>

      <div data-dev-id="0view3r" className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {filterLabel && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1 px-2 py-1 rounded-lg"
            >
              {filterLabel}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => onFilterChange(null)}
              />
            </Badge>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-xl gap-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50",
                  filterLabel && "text-blue-600 bg-blue-50"
                )}
              >
                <Filter size={18} />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 rounded-2xl glass border-white/40 shadow-xl">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500 px-2 py-1.5">Filter by label</p>
                <div className="max-h-60 overflow-y-auto">
                  {Array.from(
                    new Set(
                      board.lists
                        .flatMap((list) => list.cards)
                        .flatMap((card) => card.labels || [])
                        .map((label) => label.name)
                    )
                  ).length > 0 ? (
                    Array.from(
                      new Set(
                        board.lists
                          .flatMap((list) => list.cards)
                          .flatMap((card) => card.labels || [])
                          .map((label) => label.name)
                      )
                    ).map((labelName) => (
                      <button
                        key={labelName}
                        onClick={() => onFilterChange(labelName === filterLabel ? null : labelName)}
                        className={cn(
                          "w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors",
                          filterLabel === labelName
                            ? "bg-blue-600 text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        )}
                      >
                        {labelName}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 px-2 py-1.5 italic">No labels found</p>
                  )}
                </div>
                {filterLabel && (
                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => onFilterChange(null)}
                      className="w-full text-left px-2 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          data-dev-id="0viewjr"
          variant="ghost"
          size="icon"
          className="rounded-full text-slate-500 hover:text-slate-900 hover:bg-white/50">
          <MoreHorizontal data-dev-id="0viewx2" size={20} />
        </Button>
      </div>
    </motion.div>
  );
}
