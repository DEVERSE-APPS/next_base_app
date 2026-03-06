"use client";

import { Board, List } from "@/types/kanban";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ListComponent } from "./ListComponent";

interface ListContainerProps {
  board: Board;
  onUpdateBoard: (updates: Partial<Board>) => void;
}

export function ListContainer({ board, onUpdateBoard }: ListContainerProps) {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (!newListTitle.trim()) return;

    const newList: List = {
      id: Math.random().toString(36).substring(2, 9),
      title: newListTitle.trim(),
      boardId: board.id,
      order: board.lists.length,
      cards: [],
    };

    onUpdateBoard({
      lists: [...board.lists, newList],
    });

    setNewListTitle("");
    setIsAddingList(false);
  };

  const handleUpdateList = (listId: string, updates: Partial<List>) => {
    onUpdateBoard({
      lists: board.lists.map((l) => (l.id === listId ? { ...l, ...updates } : l)),
    });
  };

  const handleDeleteList = (listId: string) => {
    onUpdateBoard({
      lists: board.lists.filter((l) => l.id !== listId),
    });
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-200px)] items-start">
      {board.lists
        .sort((a, b) => a.order - b.order)
        .map((list) => (
          <ListComponent
            key={list.id}
            list={list}
            onUpdateList={(updates) => handleUpdateList(list.id, updates)}
            onDeleteList={() => handleDeleteList(list.id)}
          />
        ))}

      <div className="flex-shrink-0 w-72">
        {isAddingList ? (
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-glass">
            <Input
              autoFocus
              placeholder="Enter list title..."
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddList();
                if (e.key === "Escape") setIsAddingList(false);
              }}
              className="mb-2 bg-white/40 border-slate-200"
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleAddList} size="sm" className="bg-blue-600 hover:bg-blue-700">
                Add List
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingList(false)}
                className="text-slate-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsAddingList(true)}
            variant="ghost"
            className="w-full justify-start gap-2 bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 text-slate-700 h-12 rounded-xl"
          >
            <Plus className="h-5 w-5" />
            Add another list
          </Button>
        )}
      </div>
    </div>
  );
}
