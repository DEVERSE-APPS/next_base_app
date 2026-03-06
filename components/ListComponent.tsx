"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { List, Card } from "@/types/kanban";
import { MoreHorizontal, Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardComponent } from "./CardComponent";

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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: "List",
      list,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

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

  const cardIds = useMemo(() => list.cards.map((c) => c.id), [list.cards]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex-shrink-0 w-72 flex flex-col max-h-full bg-white/20 backdrop-blur-xl border border-blue-500/50 rounded-2xl shadow-glass opacity-50 min-h-[200px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-shrink-0 w-72 flex flex-col max-h-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-glass">
      {/* List Header */}
      <div
        data-dev-id="005ofhf"
        className="p-3 flex items-center justify-between group">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-slate-100 rounded-md mr-1"
        >
          <GripVertical className="h-4 w-4 text-slate-400" />
        </div>
        {isEditingTitle ? (
          <Input
            data-dev-id="005ogyu"
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
            className="h-8 text-sm font-semibold bg-white/40 border-blue-500/50" />
        ) : (
          <h2
            data-dev-id="005pn8g"
            onClick={() => setIsEditingTitle(true)}
            className="text-sm font-semibold text-slate-900 px-2 py-1 cursor-pointer flex-1">
            {list.title}
          </h2>
        )}

        <DropdownMenu data-dev-id="04smk3j">
          <DropdownMenuTrigger data-dev-id="04smku9" asChild>
            <Button
              data-dev-id="04smlkz"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500">
              <MoreHorizontal data-dev-id="04smmbp" className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent data-dev-id="04smojt" align="end" className="w-48">
            <DropdownMenuItem
              data-dev-id="04smpaj"
              className="text-red-600 focus:text-red-600"
              onClick={onDeleteList}>
              Delete List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Cards List */}
      <div
        data-dev-id="06lw3jh"
        className="flex-1 overflow-y-auto px-3 pb-2 space-y-2 min-h-[10px]">
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {list.cards
            .sort((a, b) => a.order - b.order)
            .map((card) => (
              <CardComponent key={card.id} card={card} />
            ))}
        </SortableContext>
      </div>
      {/* List Footer */}
      <div data-dev-id="06mvut4" className="p-3">
        {isAddingCard ? (
          <div data-dev-id="06mx4s7" className="space-y-2">
            <textarea
              data-dev-id="06mxrrr"
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
              className="w-full min-h-[80px] p-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none" />
            <div data-dev-id="06nxj1c" className="flex items-center gap-2">
              <Button
                data-dev-id="06ny60w"
                onClick={handleAddCard}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700">
                Add Card
              </Button>
              <Button
                data-dev-id="06o02zi"
                variant="ghost"
                size="icon"
                onClick={() => setIsAddingCard(false)}
                className="h-8 w-8 text-slate-500">
                <X data-dev-id="06ohbms" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            data-dev-id="06okil1"
            onClick={() => setIsAddingCard(true)}
            variant="ghost"
            className="w-full justify-start gap-2 text-slate-600 hover:bg-slate-100/50 h-9 rounded-lg">
            <Plus data-dev-id="06p148s" className="h-4 w-4" />
            Add a card
          </Button>
        )}
      </div>
    </div>
  );
}

