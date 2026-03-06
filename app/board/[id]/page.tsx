"use client";

import { useParams, useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Board } from "@/types/kanban";
import { BoardHeader } from "@/components/BoardHeader";
import { ListContainer } from "@/components/ListContainer";
import { CardDetailModal } from "@/components/CardDetailModal";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = params.id as string;
  const [boards, setBoards] = useLocalStorage<Board[]>("kanban-boards", []);
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (boards.length > 0) {
      const currentBoard = boards.find((b) => b.id === boardId);
      if (currentBoard) {
        setBoard(currentBoard);
      } else {
        // Board not found, redirect to dashboard
        router.push("/");
      }
      setIsLoading(false);
    }
  }, [boards, boardId, router]);

  const handleUpdateBoard = (updates: Partial<Board>) => {
    if (!board) return;

    const updatedBoard = { ...board, ...updates, updatedAt: new Date().toISOString() };
    setBoard(updatedBoard);

    const updatedBoards = boards.map((b) => (b.id === boardId ? updatedBoard : b));
    setBoards(updatedBoards);
  };

  if (isLoading) {
    return (
      <div data-dev-id="06aqola" className="space-y-6">
        <div data-dev-id="06aqnuk" className="flex items-center justify-between">
          <Skeleton data-dev-id="06aqn3u" className="h-10 w-64 rounded-lg" />
          <Skeleton data-dev-id="06aqmd4" className="h-10 w-10 rounded-full" />
        </div>
        <div data-dev-id="06aq5b4" className="flex gap-6 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton
              data-dev-id="06aq3tp"
              key={i}
              className="h-[500px] w-72 rounded-2xl flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!board) return null;

  const isColor = board.background.startsWith("#") || board.background.startsWith("bg-");

  return (
    <div data-dev-id="06apfcr" className="flex flex-col h-full">
      <div
        data-dev-id="06apem1"
        className={cn(
          "fixed inset-0 -z-10 transition-colors duration-500",
          isColor ? board.background : "bg-cover bg-center"
        )}
        style={!isColor ? { backgroundImage: `url(${board.background})` } : {}}>
        <div
          data-dev-id="06aotuk"
          className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>
      <BoardHeader data-dev-id="06aosd5" board={board} onUpdateBoard={handleUpdateBoard} />
      <ListContainer data-dev-id="0hw0dg0" board={board} onUpdateBoard={handleUpdateBoard} />
      <Suspense data-dev-id="06ao64k" fallback={null}>
        <CardDetailModal data-dev-id="06ao5du" board={board} onUpdateBoard={handleUpdateBoard} />
      </Suspense>
    </div>
  );
}

