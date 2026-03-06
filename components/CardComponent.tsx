"use client";

import { Card } from "@/types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
      <p data-dev-id="08joejc" className="text-sm text-slate-700">{card.title}</p>
      {card.labels && card.labels.length > 0 && (
        <div data-dev-id="08jog0r" className="flex flex-wrap gap-1 mt-2">
          {card.labels.map((label) => (
            <div
              data-dev-id="08jox2r"
              key={label.id}
              className="h-1.5 w-8 rounded-full"
              style={{ backgroundColor: label.color }} />
          ))}
        </div>
      )}
    </div>
  );
}
