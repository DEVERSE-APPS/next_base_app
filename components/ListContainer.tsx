"use client";

import { Board, List, Card } from "@/types/kanban";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ListComponent } from "./ListComponent";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CardComponent } from "./CardComponent";
import { createPortal } from "react-dom";

interface ListContainerProps {
  board: Board;
  onUpdateBoard: (updates: Partial<Board>) => void;
  filterLabel: string | null;
}

export function ListContainer({ board, onUpdateBoard, filterLabel }: ListContainerProps) {
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [activeList, setActiveList] = useState<List | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const listIds = useMemo(() => board.lists.map((l) => l.id), [board.lists]);

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

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }

    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === "Card";
    const isOverACard = over.data.current?.type === "Card";

    if (!isActiveACard) return;

    // Dropping a card over another card
    if (isActiveACard && isOverACard) {
      const activeListId = active.data.current?.card.listId;
      const overListId = over.data.current?.card.listId;

      if (activeListId !== overListId) {
        const newLists = [...board.lists];
        const sourceList = newLists.find((l) => l.id === activeListId);
        const destList = newLists.find((l) => l.id === overListId);

        if (sourceList && destList) {
          const activeIndex = sourceList.cards.findIndex((c) => c.id === activeId);
          const overIndex = destList.cards.findIndex((c) => c.id === overId);

          if (activeIndex !== -1) {
            const [cardToMove] = sourceList.cards.splice(activeIndex, 1);
            cardToMove.listId = overListId;
            destList.cards.splice(overIndex, 0, cardToMove);
            
            // Re-order cards
            sourceList.cards.forEach((c, i) => (c.order = i));
            destList.cards.forEach((c, i) => (c.order = i));

            onUpdateBoard({ lists: newLists });
          }
        }
      } else {
        // Same list reordering during drag for visual feedback
        const list = board.lists.find(l => l.id === activeListId);
        if (list) {
          const activeIndex = list.cards.findIndex((c) => c.id === activeId);
          const overIndex = list.cards.findIndex((c) => c.id === overId);
          
          if (activeIndex !== overIndex && activeIndex !== -1 && overIndex !== -1) {
            const newLists = board.lists.map(l => {
              if (l.id === activeListId) {
                const newCards = arrayMove(l.cards, activeIndex, overIndex);
                newCards.forEach((c, i) => c.order = i);
                return { ...l, cards: newCards };
              }
              return l;
            });
            onUpdateBoard({ lists: newLists });
          }
        }
      }
    }

    // Dropping a card over a list
    const isOverAList = over.data.current?.type === "List";
    if (isActiveACard && isOverAList) {
      const activeListId = active.data.current?.card.listId;
      const overListId = overId as string;

      if (activeListId !== overListId) {
        const newLists = [...board.lists];
        const sourceList = newLists.find((l) => l.id === activeListId);
        const destList = newLists.find((l) => l.id === overListId);

        if (sourceList && destList) {
          const activeIndex = sourceList.cards.findIndex((c) => c.id === activeId);
          if (activeIndex !== -1) {
            const [cardToMove] = sourceList.cards.splice(activeIndex, 1);
            cardToMove.listId = overListId;
            destList.cards.push(cardToMove);
            
            // Re-order cards
            sourceList.cards.forEach((c, i) => (c.order = i));
            destList.cards.forEach((c, i) => (c.order = i));

            onUpdateBoard({ lists: newLists });
          }
        }
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const isActiveAList = active.data.current?.type === "List";
      if (isActiveAList) {
        const oldIndex = board.lists.findIndex((l) => l.id === active.id);
        const newIndex = board.lists.findIndex((l) => l.id === over.id);

        const newLists = arrayMove(board.lists, oldIndex, newIndex);
        newLists.forEach((l, i) => (l.order = i));
        onUpdateBoard({ lists: newLists });
      }
    }

    setActiveList(null);
    setActiveCard(null);
  };


  return (
    <DndContext
      data-dev-id="0x5f2kc"
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}>
      <div
        data-dev-id="0spw6or"
        className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-200px)] items-start px-4 md:px-8 lg:px-10">
        <SortableContext
          data-dev-id="0x5efks"
          items={listIds}
          strategy={horizontalListSortingStrategy}>
          {board.lists
            .sort((a, b) => a.order - b.order)
            .map((list) => (
              <ListComponent
                data-dev-id="0spw9nk"
                key={list.id}
                list={list}
                onUpdateList={(updates) => handleUpdateList(list.id, updates)}
                onDeleteList={() => handleDeleteList(list.id)}
                filterLabel={filterLabel} />
            ))}
        </SortableContext>
        <div data-dev-id="0spwv5q" className="flex-shrink-0 w-72">
          {isAddingList ? (
            <div
              data-dev-id="0spwwn5"
              className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-glass">
              <Input
                data-dev-id="0spwxdv"
                autoFocus
                placeholder="Enter list title..."
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddList();
                  if (e.key === "Escape") setIsAddingList(false);
                }}
                className="mb-2 bg-white/40 border-slate-200" />
              <div data-dev-id="0spxl44" className="flex items-center gap-2">
                <Button
                  data-dev-id="0spxluu"
                  onClick={handleAddList}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700">
                  Add List
                </Button>
                <Button
                  data-dev-id="0spy3nj"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingList(false)}
                  className="text-slate-500">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              data-dev-id="0spyrds"
              onClick={() => setIsAddingList(true)}
              variant="ghost"
              className="w-full justify-start gap-2 bg-white/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 text-slate-700 h-12 rounded-xl">
              <Plus data-dev-id="0spyv3a" className="h-5 w-5" />
              Add another list
            </Button>
          )}
        </div>
      </div>
      {typeof document !== "undefined" && createPortal(
        <DragOverlay
          data-dev-id="0x5alnl"
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: "0.5",
                },
              },
            }),
          }}>
          {activeList && (
            <ListComponent
              data-dev-id="0x59yo1"
              list={activeList}
              onUpdateList={() => {}}
              onDeleteList={() => {}} />
          )}
          {activeCard && (
            <CardComponent data-dev-id="0x59dwk" card={activeCard} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

