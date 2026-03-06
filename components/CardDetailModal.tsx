"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Board, Card } from "@/types/kanban";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { AlignLeft, Type, Tag, CheckSquare, Calendar, Plus, X, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [isAddingChecklistItem, setIsAddingChecklistItem] = useState(false);

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

  const addChecklistItem = () => {
    if (!newChecklistItem.trim() || !card) return;
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newChecklistItem.trim(),
      completed: false,
    };
    updateCard({
      checklists: [...(card.checklists || []), newItem],
    });
    setNewChecklistItem("");
    setIsAddingChecklistItem(false);
  };

  const toggleChecklistItem = (itemId: string) => {
    if (!card) return;
    const updatedChecklists = card.checklists.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    updateCard({ checklists: updatedChecklists });
  };

  const deleteChecklistItem = (itemId: string) => {
    if (!card) return;
    const updatedChecklists = card.checklists.filter((item) => item.id !== itemId);
    updateCard({ checklists: updatedChecklists });
  };

  const toggleLabel = (labelName: string, color: string) => {
    if (!card) return;
    const existingLabel = card.labels?.find((l) => l.name === labelName);
    let updatedLabels = [];
    if (existingLabel) {
      updatedLabels = card.labels.filter((l) => l.name !== labelName);
    } else {
      updatedLabels = [
        ...(card.labels || []),
        { id: Math.random().toString(36).substr(2, 9), name: labelName, color },
      ];
    }
    updateCard({ labels: updatedLabels });
  };

  const COLORS = [
    { name: "Green", color: "#10b981" },
    { name: "Yellow", color: "#facc15" },
    { name: "Orange", color: "#f97316" },
    { name: "Red", color: "#f43f5e" },
    { name: "Purple", color: "#a855f7" },
    { name: "Blue", color: "#3b82f6" },
    { name: "Cyan", color: "#22d3ee" },
    { name: "Pink", color: "#ec4899" },
  ];

  const completedCount = card?.checklists?.filter((i) => i.completed).length || 0;
  const totalCount = card?.checklists?.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  if (!card) return null;

  return (
    <Dialog
      data-dev-id="07g41hs"
      open={!!cardId}
      onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        data-dev-id="07g428i"
        className="max-w-3xl bg-white/90 backdrop-blur-2xl border-white/40 shadow-2xl rounded-2xl overflow-hidden">
        <DialogHeader data-dev-id="07g42z8" className="flex flex-row items-start gap-4 pr-8">
          <Type
            data-dev-id="07g43py"
            className="w-5 h-5 mt-2 text-slate-500 flex-shrink-0" />
          <div data-dev-id="07g44go" className="flex-1">
            <DialogTitle data-dev-id="07g457e" asChild>
              {isEditingTitle ? (
                <Input
                  data-dev-id="0hnonjh"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleTitleBlur()}
                  className="text-xl font-semibold bg-white/50 border-blue-500/50 focus:ring-blue-500/20 h-auto py-1 px-2" />
              ) : (
                <h2
                  data-dev-id="0hnou7r"
                  onClick={() => setIsEditingTitle(true)}
                  className="text-xl font-semibold text-slate-900 cursor-pointer hover:bg-slate-200/50 p-1 -ml-1 rounded transition-colors">
                  {title}
                </h2>
              )}
            </DialogTitle>
            <p data-dev-id="0hnpfpx" className="text-sm text-slate-500 mt-1">
              in list <span data-dev-id="0hnpggn" className="underline font-medium">{board.lists.find(l => l.id === card.listId)?.title}</span>
            </p>
          </div>
        </DialogHeader>

        <div
          data-dev-id="0ktinyx"
          className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 mt-6">
          <div data-dev-id="0kti0zd" className="space-y-8">
            {/* Description Section */}
            <div data-dev-id="0ktgr0a" className="space-y-4">
              <div
                data-dev-id="0ktg40q"
                className="flex items-center gap-3 text-slate-900 font-semibold">
                <AlignLeft data-dev-id="0ktfh16" className="w-5 h-5" />
                <h3 data-dev-id="0kteu1m">Description</h3>
                {!isEditingDescription && card.description && (
                  <Button
                    data-dev-id="0kt05cg"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingDescription(true)}
                    className="ml-2 h-8 px-2 text-xs bg-slate-100 hover:bg-slate-200">
                    Edit
                  </Button>
                )}
              </div>

              {isEditingDescription ? (
                <div data-dev-id="0ksf2s0" className="space-y-3">
                  <Textarea
                    data-dev-id="0ksefsg"
                    autoFocus
                    placeholder="Add a more detailed description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[150px] bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl" />
                  <div data-dev-id="0krwk5n" className="flex gap-2">
                    <Button
                      data-dev-id="0krvx5i"
                      onClick={handleDescriptionSave}
                      className="bg-blue-600 hover:bg-blue-700 rounded-lg">
                      Save
                    </Button>
                    <Button
                      data-dev-id="0kru06w"
                      variant="ghost"
                      onClick={() => {
                        setIsEditingDescription(false);
                        setDescription(card.description || "");
                      }}
                      className="rounded-lg">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  data-dev-id="0kr8amx"
                  onClick={() => setIsEditingDescription(true)}
                  className={`min-h-[100px] p-3 rounded-xl transition-colors cursor-pointer ${
                    card.description
                      ? "hover:bg-slate-100/50"
                      : "bg-slate-100/50 hover:bg-slate-200/50"
                  }`}>
                  {card.description ? (
                    <div
                      data-dev-id="0kqp512"
                      className="prose prose-slate max-w-none text-slate-700">
                      <ReactMarkdown data-dev-id="0kqoi1i">{card.description}</ReactMarkdown>
                    </div>
                  ) : (
                    <p data-dev-id="0kq96ct" className="text-slate-500 text-sm">Add a more detailed description...</p>
                  )}
                </div>
              )}
            </div>

            {/* Checklist Section */}
            <div data-dev-id="0ktgr0b" className="space-y-4">
              <div
                data-dev-id="0ktg40r"
                className="flex items-center justify-between text-slate-900 font-semibold">
                <div data-dev-id="0ktfh17" className="flex items-center gap-3">
                  <CheckSquare data-dev-id="0ktfh18" className="w-5 h-5" />
                  <h3 data-dev-id="0kteu1n">Checklist</h3>
                </div>
                {card.checklists && card.checklists.length > 0 && (
                  <Button
                    data-dev-id="0kt05ch"
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteChecklistItem("")} // This is just a placeholder for "Delete all" if needed, but let's just use it to show the button
                    className="h-8 px-2 text-xs bg-slate-100 hover:bg-slate-200 hidden">
                    Delete
                  </Button>
                )}
              </div>

              {totalCount > 0 && (
                <div data-dev-id="0ktg40s" className="flex items-center gap-3">
                  <span data-dev-id="0ktg40t" className="text-xs font-medium text-slate-500 w-8">{progress}%</span>
                  <Progress data-dev-id="0ktg40u" value={progress} className="h-2 flex-1 bg-slate-100" />
                </div>
              )}

              <div data-dev-id="0ktg40v" className="space-y-2">
                {card.checklists?.map((item) => (
                  <div
                    data-dev-id="0ktg40w"
                    key={item.id}
                    className="flex items-center gap-3 group">
                    <Checkbox
                      data-dev-id="0ktg40x"
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="rounded-md border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                    <span
                      data-dev-id="0ktg40y"
                      className={cn(
                        "text-sm flex-1 transition-all",
                        item.completed ? "text-slate-400 line-through" : "text-slate-700"
                      )}>
                      {item.title}
                    </span>
                    <Button
                      data-dev-id="0ktg40z"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteChecklistItem(item.id)}
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity">
                      <Trash2 data-dev-id="0ktg410" className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {isAddingChecklistItem ? (
                <div data-dev-id="0ktg411" className="space-y-3 ml-8">
                  <Input
                    data-dev-id="0ktg412"
                    autoFocus
                    placeholder="Add an item"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
                    className="bg-white/50 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl" />
                  <div data-dev-id="0ktg413" className="flex gap-2">
                    <Button
                      data-dev-id="0ktg414"
                      onClick={addChecklistItem}
                      className="bg-blue-600 hover:bg-blue-700 rounded-lg h-8 px-3 text-xs">
                      Add
                    </Button>
                    <Button
                      data-dev-id="0ktg415"
                      variant="ghost"
                      onClick={() => {
                        setIsAddingChecklistItem(false);
                        setNewChecklistItem("");
                      }}
                      className="rounded-lg h-8 px-3 text-xs">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  data-dev-id="0ktg416"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingChecklistItem(true)}
                  className="ml-8 h-8 px-3 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg">
                  Add an item
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div data-dev-id="0kq42gk" className="space-y-6">
            <div data-dev-id="0kpq0qx" className="space-y-2">
              <h4
                data-dev-id="0kppdrd"
                className="text-xs font-bold text-slate-500 uppercase tracking-wider">Add to card</h4>
              <div data-dev-id="0kpoqrt" className="flex flex-col gap-2">
                <Popover data-dev-id="0kpoqrt-pop">
                  <PopoverTrigger asChild>
                    <Button
                      data-dev-id="0kpo3ro"
                      variant="outline"
                      className="justify-start gap-2 bg-white/50 border-slate-200 hover:bg-slate-100 rounded-lg h-9 text-sm">
                      <Tag data-dev-id="0kpngs4" className="w-4 h-4" /> Labels
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent data-dev-id="0kpoqrt-content" className="w-64 p-3 rounded-xl" align="start">
                    <h5 data-dev-id="0kpoqrt-h5" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Labels</h5>
                    <div data-dev-id="0kpoqrt-grid" className="grid grid-cols-1 gap-1">
                      {COLORS.map((color) => (
                        <button
                          data-dev-id={`label-${color.name}`}
                          key={color.name}
                          onClick={() => toggleLabel(color.name, color.color)}
                          className="flex items-center gap-2 w-full p-1.5 rounded-md hover:bg-slate-100 transition-colors group">
                          <div
                            data-dev-id={`label-color-${color.name}`}
                            className="w-full h-8 rounded flex items-center px-3 text-white text-xs font-medium"
                            style={{ backgroundColor: color.color }}>
                            {color.name}
                            {card.labels?.some((l) => l.name === color.name) && (
                              <CheckSquare data-dev-id={`label-check-${color.name}`} className="w-3.5 h-3.5 ml-auto" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  data-dev-id="0kpm6t1"
                  variant="outline"
                  onClick={() => setIsAddingChecklistItem(true)}
                  className="justify-start gap-2 bg-white/50 border-slate-200 hover:bg-slate-100 rounded-lg h-9 text-sm">
                  <CheckSquare data-dev-id="0kpljth" className="w-4 h-4" /> Checklist
                </Button>

                <Popover data-dev-id="0kpk9ue-pop">
                  <PopoverTrigger asChild>
                    <Button
                      data-dev-id="0kpk9ue"
                      variant="outline"
                      className="justify-start gap-2 bg-white/50 border-slate-200 hover:bg-slate-100 rounded-lg h-9 text-sm">
                      <Calendar data-dev-id="0kdmjo6" className="w-4 h-4" /> Dates
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent data-dev-id="0kpk9ue-content" className="w-auto p-0 rounded-xl" align="start">
                    <CalendarComponent
                      data-dev-id="0kpk9ue-cal"
                      mode="single"
                      selected={card.dueDate ? new Date(card.dueDate) : undefined}
                      onSelect={(date) => updateCard({ dueDate: date?.toISOString() })}
                      initialFocus />
                    {card.dueDate && (
                      <div data-dev-id="0kpk9ue-footer" className="p-3 border-t border-slate-100">
                        <Button
                          data-dev-id="0kpk9ue-remove"
                          variant="ghost"
                          size="sm"
                          onClick={() => updateCard({ dueDate: undefined })}
                          className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                          Remove Date
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Display active labels and dates */}
              {(card.labels?.length > 0 || card.dueDate) && (
                <div data-dev-id="0kpk9ue-active" className="pt-4 space-y-4">
                  {card.labels?.length > 0 && (
                    <div data-dev-id="0kpk9ue-labels" className="space-y-2">
                      <h4 data-dev-id="0kpk9ue-labels-h4" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Labels</h4>
                      <div data-dev-id="0kpk9ue-labels-flex" className="flex flex-wrap gap-1">
                        {card.labels.map((label) => (
                          <Badge
                            data-dev-id={`badge-${label.id}`}
                            key={label.id}
                            className="text-white border-none"
                            style={{ backgroundColor: label.color }}>
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {card.dueDate && (
                    <div data-dev-id="0kpk9ue-date" className="space-y-2">
                      <h4 data-dev-id="0kpk9ue-date-h4" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</h4>
                      <div data-dev-id="0kpk9ue-date-flex" className="flex items-center gap-2">
                        <Badge data-dev-id="0kpk9ue-date-badge" variant="outline" className="bg-slate-100 border-slate-200 text-slate-700">
                          {format(new Date(card.dueDate), "PPP")}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
