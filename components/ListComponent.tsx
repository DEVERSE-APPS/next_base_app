"use client";

import { useState, useRef, useEffect } from "react";
import { List, Card } from "@/types/kanban";
import { MoreHorizontal, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ListComponentProps {
  list: List;
  onUpdateList: (updates: Partial<List>) => void;
  onDeleteList: () => void;
}

export function ListComponent({ list, onUpdateList, onDeleteList }: ListComponentProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (title.trim() && title !== list.title) {
      onUpdateList({ title: title.trim() });
    } else {
      setTitle(list.title);
    }
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;

    const newCard: Card = {
      id: Math.random().toString(36).substring(2, 9),
      title: newCardTitle.trim(),
      description: "",
      listId: list.id,
      boardId: list.boardId,
      order: list.cards.length,
      labels: [],
      checklists: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onUpdateList({
      cards: [...list.cards, newCard],
    });

    setNewCardTitle("");
    setIsAddingCard(false);
  };

  return (
    <div className="flex-shrink-0 w-72 flex flex-col max-h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-glass">
      {/* List Header */}
      <div className="p-3 flex items-center justify-between group">
        {isEditingTitle ? (
          <Input
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleBlur();
              if (e.key === "Escape") {
                setIsEditingTitle(false);
                setTitle(list.title);
              }
            }}
            className="h-8 text-sm font-semibold bg-white/40 border-blue-500/50"
          />
        ) : (
          <h2
            onClick={() => setIsEditingTitle(true)}
            className="text-sm font-semibold text-slate-900 px-2 py-1 cursor-pointer flex-1"
          >
            {list.title}
          </h2>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={onDeleteList}
            >
              Delete List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards List */}
      <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-2 min-h-[10px]">
        {list.cards
          .sort((a, b) => a.order - b.order)
          .map((card) => (
            <div
              key={card.id}
              className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-blue-500/30 transition-colors cursor-pointer group"
            >
              <p className="text-sm text-slate-700">{card.title}</p>
            </div>
          ))}
      </div>

      {/* List Footer */}
      <div className="p-3">
        {isAddingCard ? (
          <div className="space-y-2">
            <textarea
              autoFocus
              placeholder="Enter a title for this card..."
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddCard();
                }
                if (e.key === "Escape") setIsAddingCard(false);
              }}
              className="w-full min-h-[80px] p-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleAddCard} size="sm" className="bg-blue-600 hover:bg-blue-700">
                Add Card
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAddingCard(false)}
                className="h-8 w-8 text-slate-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsAddingCard(true)}
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-600 hover:bg-slate-100/50 h-9 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            Add a card
          </Button>
        )}
      </div>
    </div>
  );
}
