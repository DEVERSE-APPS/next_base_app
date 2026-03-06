import { Board } from "@/types/kanban";

export const MOCK_BOARDS: Board[] = [
  {
    id: "board-1",
    title: "Product Roadmap 2024",
    background: "bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-500/10",
    isStarred: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lists: [
      {
        id: "list-1",
        title: "Backlog",
        boardId: "board-1",
        order: 0,
        cards: [
          {
            id: "card-1",
            title: "Implement Glassmorphism UI",
            description: "Use backdrop-blur and semi-transparent borders for all components.",
            listId: "list-1",
            boardId: "board-1",
            order: 0,
            labels: [
              { id: "label-1", name: "Design", color: "bg-cyan-400" },
              { id: "label-2", name: "High Priority", color: "bg-red-500" }
            ],
            checklists: [
              { id: "check-1", title: "Define color palette", completed: true },
              { id: "check-2", title: "Create glass card component", completed: false }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "card-2",
            title: "Setup Local Storage Hook",
            description: "Create a custom hook for persistent state management.",
            listId: "list-1",
            boardId: "board-1",
            order: 1,
            labels: [{ id: "label-3", name: "Engineering", color: "bg-blue-600" }],
            checklists: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]
      },
      {
        id: "list-2",
        title: "In Progress",
        boardId: "board-1",
        order: 1,
        cards: [
          {
            id: "card-3",
            title: "Drag and Drop Implementation",
            description: "Integrate @dnd-kit for list and card reordering.",
            listId: "list-2",
            boardId: "board-1",
            order: 0,
            labels: [{ id: "label-3", name: "Engineering", color: "bg-blue-600" }],
            checklists: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]
      },
      {
        id: "list-3",
        title: "Done",
        boardId: "board-1",
        order: 2,
        cards: [
          {
            id: "card-4",
            title: "Project Setup",
            description: "Initialize Next.js project with Tailwind CSS 4.",
            listId: "list-3",
            boardId: "board-1",
            order: 0,
            labels: [{ id: "label-3", name: "Engineering", color: "bg-blue-600" }],
            checklists: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        ]
      }
    ]
  },
  {
    id: "board-2",
    title: "Marketing Campaign",
    background: "bg-gradient-to-br from-purple-600/10 via-transparent to-pink-500/10",
    isStarred: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lists: []
  }
];

export const STORAGE_KEY = "kanban-flow-boards";

export const initializeStorage = () => {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_BOARDS));
    }
  }
};
