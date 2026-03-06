"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Board } from "@/types/kanban";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BoardCard } from "./BoardCard";
import { CreateBoardModal } from "./CreateBoardModal";
import { v4 as uuidv4 } from "uuid";

export function BoardGrid() {
  const [boards, setBoards] = useLocalStorage<Board[]>("kanban-boards", []);

  const handleCreateBoard = (title: string, background: string) => {
    const newBoard: Board = {
      id: uuidv4(),
      title,
      background,
      isStarred: false,
      lists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBoards([...boards, newBoard]);
  };

  const handleToggleStar = (id: string) => {
    setBoards(
      boards.map((board) =>
        board.id === id ? { ...board, isStarred: !board.isStarred } : board
      )
    );
  };

  const handleDeleteBoard = (id: string) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  // Sort boards: starred first, then by creation date
  const sortedBoards = [...boards].sort((a, b) => {
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Welcome back! Here are your active boards.
          </p>
        </div>
        <CreateBoardModal onCreate={handleCreateBoard} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {sortedBoards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onToggleStar={handleToggleStar}
              onDelete={handleDeleteBoard}
            />
          ))}
          
          <CreateBoardModal
            onCreate={handleCreateBoard}
            trigger={
              <motion.button
                whileHover={{ y: -4 }}
                data-testid="create-board-trigger-card"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/40 transition-all hover:border-blue-500/50 hover:bg-white/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-500">
                  <Plus size={24} />
                </div>
                <span className="mt-3 font-medium text-slate-500 group-hover:text-blue-600">
                  Create new board
                </span>
              </motion.button>
            }
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
