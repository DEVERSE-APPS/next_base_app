"use client";

import { Card } from "@/types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface CardComponentProps {
  card: Card;
  onClick?: () => void;
}

export function CardComponent({ card, onClick }: CardComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "Card",
      card,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/40 border border-blue-500/50 rounded-xl p-3 shadow-sm opacity-50 h-[80px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-blue-500/30 transition-colors cursor-pointer group active:cursor-grabbing",
        "hover:shadow-md"
      )}
    >
      <p className="text-sm text-slate-700">{card.title}</p>
      {card.labels && card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {card.labels.map((label) => (
            <div
              key={label.id}
              className="h-1.5 w-8 rounded-full"
              style={{ backgroundColor: label.color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
