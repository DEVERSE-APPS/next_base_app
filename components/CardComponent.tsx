"use client";

import { Card } from "@/types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Calendar, CheckSquare } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

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
        className="bg-white/40 border border-blue-500/50 rounded-2xl p-3 shadow-sm opacity-50 h-[80px] backdrop-blur-sm" />
    );
  }

  const completedChecklistItems = card.checklists?.filter((i) => i.completed).length || 0;
  const totalChecklistItems = card.checklists?.length || 0;
  const isAllCompleted = totalChecklistItems > 0 && completedChecklistItems === totalChecklistItems;

  return (
    <motion.div
      data-dev-id="08jnqt3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:border-blue-500/30 transition-colors cursor-pointer group active:cursor-grabbing",
      )}>
      {card.labels && card.labels.length > 0 && (
        <div data-dev-id="08jog0r" className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((label) => (
            <div
              data-dev-id="08jox2r"
              key={label.id}
              className="h-1.5 w-8 rounded-full"
              style={{ backgroundColor: label.color }}
              title={label.name}
            />
          ))}
        </div>
      )}
      <h3 data-dev-id="08jp9v2" className="text-sm font-medium text-slate-900 mb-2">
        {card.title}
      </h3>
      
      {(card.dueDate || totalChecklistItems > 0) && (
        <div data-dev-id="08jpq8r" className="flex items-center gap-3 mt-3">
          {card.dueDate && (
            <div
              data-dev-id="08jq36r"
              className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100/50 px-1.5 py-0.5 rounded">
              <Calendar data-dev-id="08jqj6r" size={10} />
              {format(new Date(card.dueDate), "MMM d")}
            </div>
          )}
          {totalChecklistItems > 0 && (
            <div
              data-dev-id="08jr06r"
              className={cn(
                "flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded",
                isAllCompleted
                  ? "bg-green-100/50 text-green-600"
                  : "bg-slate-100/50 text-slate-500"
              )}>
              <CheckSquare data-dev-id="08jrj6r" size={10} />
              {completedChecklistItems}/{totalChecklistItems}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
