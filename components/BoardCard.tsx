"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, Trash2, MoreVertical } from "lucide-react";
import { Board } from "@/types/kanban";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BoardCardProps {
  board: Board;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BoardCard({ board, onToggleStar, onDelete }: BoardCardProps) {
  const router = useRouter();
  const isColor = board.background.startsWith("#") || board.background.startsWith("bg-");

  return (
    <motion.div
      data-dev-id="0po0hxs"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={() => router.push(`/board/${board.id}`)}
      className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-white/40 bg-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-colors hover:border-blue-500/30">
      <div
        data-dev-id="0po11yl"
        className={cn(
          "absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105",
          isColor ? board.background : "bg-cover bg-center"
        )}
        style={!isColor ? { backgroundImage: `url(${board.background})` } : {}}>
        <div
          data-dev-id="0po175h"
          className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
      </div>
      <div
        data-dev-id="0po1pov"
        className="relative z-10 flex h-full flex-col justify-between p-4 text-white">
        <div data-dev-id="0po1qfl" className="flex items-start justify-between">
          <h3
            data-dev-id="0po1r6b"
            className="font-heading text-lg font-semibold tracking-tight drop-shadow-md">
            {board.title}
          </h3>
          <div data-dev-id="0po1tef" className="flex gap-1">
            <button
              data-dev-id="0po1u55"
              data-testid="toggle-star"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleStar(board.id);
              }}
              className={cn(
                "rounded-lg p-1.5 transition-colors hover:bg-white/20",
                board.isStarred ? "text-yellow-400" : "text-white/70 hover:text-white"
              )}>
              <Star
                data-dev-id="0po2y6o"
                size={18}
                fill={board.isStarred ? "currentColor" : "none"}
                strokeWidth={1.75} />
            </button>

            <DropdownMenu data-dev-id="0eefarl">
              <DropdownMenuTrigger data-dev-id="0eefxr5" asChild>
                <button
                  data-dev-id="0eetzgs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white">
                  <MoreVertical data-dev-id="0eeygdi" size={18} strokeWidth={1.75} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                data-dev-id="0efds27"
                align="end"
                className="w-40 rounded-xl border-white/20 bg-white/80 backdrop-blur-xl">
                <DropdownMenuItem
                  data-dev-id="0efef1r"
                  data-testid="delete-board"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(board.id);
                  }}
                  className="text-red-600 focus:bg-red-50 focus:text-red-600">
                  <Trash2 data-dev-id="0efjiy0" className="mr-2 h-4 w-4" />
                  <span data-dev-id="0efxknn">Delete Board</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
