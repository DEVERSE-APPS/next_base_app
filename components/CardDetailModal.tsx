"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Board, Card } from "@/types/kanban";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { AlignLeft, Type, Tag, CheckSquare, Calendar } from "lucide-react";

interface CardDetailModalProps {
  board: Board;
  onUpdateBoard: (updates: Partial<Board>) => void;
}

export function CardDetailModal({ board, onUpdateBoard }: CardDetailModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");

  const [card, setCard] = useState<Card | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (cardId) {
      let foundCard: Card | null = null;
      for (const list of board.lists) {
        const c = list.cards.find((c) => c.id === cardId);
        if (c) {
          foundCard = c;
          break;
        }
      }
      if (foundCard) {
        setCard(foundCard);
        setTitle(foundCard.title);
        setDescription(foundCard.description || "");
      } else {
        setCard(null);
      }
    } else {
      setCard(null);
    }
  }, [cardId, board.lists]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cardId");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateCard = (updates: Partial<Card>) => {
    if (!card) return;

    const updatedLists = board.lists.map((list) => {
      if (list.id === card.listId) {
        return {
          ...list,
          cards: list.cards.map((c) =>
            c.id === card.id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        };
      }
      return list;
    });

    onUpdateBoard({ lists: updatedLists });
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (title.trim() && title !== card?.title) {
      updateCard({ title: title.trim() });
    } else {
      setTitle(card?.title || "");
    }
  };

  const handleDescriptionSave = () => {
    setIsEditingDescription(false);
    updateCard({ description });
  };

  if (!card) return null;

  return (
    <Dialog open={!!cardId} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl bg-white/90 backdrop-blur-2xl border-white/40 shadow-2xl rounded-2xl overflow-hidden">
        <DialogHeader className="flex flex-row items-start gap-4 pr-8">
          <Type className="w-5 h-5 mt-2 text-slate-500 flex-shrink-0" />
          <div className="flex-1">
            <DialogTitle asChild>
              {isEditingTitle ? (
                <Input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleTitleBlur()}
                  className="text-xl font-semibold bg-white/50 border-blue-500/50 focus:ring-blue-500/20 h-auto py-1 px-2"
                />
              ) : (
                <h2
                  onClick={() => setIsEditingTitle(true)}
                  className="text-xl font-semibold text-slate-900 cursor-pointer hover:bg-slate-200/50 p-1 -ml-1 rounded transition-colors"
                >
                  {title}
                </h2>
              )}
            </DialogTitle>
            <p className="text-sm text-slate-500 mt-1">
              in list <span className="underline font-medium">{board.lists.find(l => l.id === card.listId)?.title}</span>
            </p>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 mt-6">
          <div className="space-y-8">
            {/* Description Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-semibold">
                <AlignLeft className="w-5 h-5" />
                <h3>Description</h3>
                {!isEditingDescription && card.description && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingDescription(true)}
                    className="ml-2 h-8 px-2 text-xs bg-slate-100 hover:bg-slate-200"
                  >
                    Edit
                  </Button>
                )}
              </div>

              {isEditingDescription ? (
                <div className="space-y-3">
                  <Textarea
                    autoFocus
                    placeholder="Add a more detailed description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[150px] bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleDescriptionSave} className="bg-blue-600 hover:bg-blue-700 rounded-lg">
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEditingDescription(false);
                        setDescription(card.description || "");
                      }}
                      className="rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingDescription(true)}
                  className={`min-h-[100px] p-3 rounded-xl transition-colors cursor-pointer ${
                    card.description
                      ? "hover:bg-slate-100/50"
                      : "bg-slate-100/50 hover:bg-slate-200/50"
                  }`}
                >
                  {card.description ? (
                    <div className="prose prose-slate max-w-none text-slate-700">
                      <ReactMarkdown>{card.description}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">Add a more detailed description...</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Add to card</h4>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start gap-2 bg-white/50 border-slate-200 hover:bg-slate-100 rounded-lg h-9 text-sm">
                  <Tag className="w-4 h-4" /> Labels
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-white/50 border-slate-200 hover:bg-slate-100 rounded-lg h-9 text-sm">
                  <CheckSquare className="w-4 h-4" /> Checklist
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-white/50 border-slate-200 hover:bg-slate-100 rounded-lg h-9 text-sm">
                  <Calendar className="w-4 h-4" /> Dates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
