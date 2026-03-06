export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  listId: string;
  boardId: string;
  order: number;
  labels: Label[];
  checklists: ChecklistItem[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  order: number;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  background: string;
  isStarred: boolean;
  lists: List[];
  createdAt: string;
  updatedAt: string;
}
