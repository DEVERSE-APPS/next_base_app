"use client";

import { Card } from "@/types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Calendar, CheckSquare } from "lucide-react";
import { format } from "date-fns";

interface CardComponentProps {
  card: Card;
}

export function CardComponent({ card }: CardComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cardId", card.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (isDragging) {
    return (
      <div
        data-dev-id="08jn4k8"
        ref={setNodeRef}
        style={style}
        className="bg-white/40 border border-blue-500/50 rounded-xl p-3 shadow-sm opacity-50 h-[80px]" />
    );
  }

  return (
    <div
      data-dev-id="08jnqt3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-blue-500/30 transition-colors cursor-pointer group active:cursor-grabbing",
        "hover:shadow-md"
      )}>
      {card.labels && card.labels.length > 0 && (
        <div data-dev-id="08jog0r" className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((label) => (
            <div
              data-dev-id="08jox2r"
              key={label.id}
              className="h-1.5 w-8 rounded-full"
              style={{ backgroundColor: label.color }}
              title={label.name} />
          ))}
        </div>
      )}
      <p data-dev-id="08joejc" className="text-sm text-slate-700 font-medium">{card.title}</p>
      
      {(card.dueDate || (card.checklists && card.checklists.length > 0)) && (
        <div data-dev-id="08joejc-meta" className="flex items-center gap-3 mt-3 text-[10px] text-slate-500">
          {card.dueDate && (
            <div data-dev-id="08joejc-date" className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded">
              <Calendar data-dev-id="08joejc-cal" className="w-3 h-3" />
              <span data-dev-id="08joejc-date-text">{format(new Date(card.dueDate), "MMM d")}</span>
            </div>
          )}
          {card.checklists && card.checklists.length > 0 && (
            <div data-dev-id="08joejc-check" className={cn(
              "flex items-center gap-1 px-1.5 py-0.5 rounded",
              card.checklists.every(i => i.completed) ? "bg-emerald-100 text-emerald-700" : "bg-slate-100"
            )}>
              <CheckSquare data-dev-id="08joejc-check-icon" className="w-3 h-3" />
              <span data-dev-id="08joejc-check-text">
                {card.checklists.filter(i => i.completed).length}/{card.checklists.length}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
