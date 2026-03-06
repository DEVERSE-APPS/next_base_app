"use client";

import { useState, useEffect, useRef } from "react";
import { Board } from "@/types/kanban";
import { Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BoardHeaderProps {
  board: Board;
  onUpdateBoard: (updates: Partial<Board>) => void;
}

export function BoardHeader({ board, onUpdateBoard }: BoardHeaderProps) {
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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="h-9 text-xl font-semibold font-heading bg-white/50 backdrop-blur-sm border-blue-500/50 w-auto min-w-[200px]"
          />
        ) : (
          <h1
            onClick={() => setIsEditing(true)}
            className="text-2xl font-semibold font-heading text-slate-900 cursor-pointer hover:bg-slate-200/50 px-2 py-1 rounded-md transition-colors"
          >
            {board.title}
          </h1>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onUpdateBoard({ isStarred: !board.isStarred })}
          className={cn(
            "h-8 w-8 rounded-full transition-colors",
            board.isStarred ? "text-yellow-500 hover:text-yellow-600" : "text-slate-400 hover:text-slate-600"
          )}
        >
          <Star className={cn("h-5 w-5", board.isStarred && "fill-current")} />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
