export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Board {
  todo: Task[];
  doing: Task[];
  done: Task[];
}

const STORAGE_KEY = 'kanban-board';

export function getBoard(): Board {
  if (typeof window === 'undefined') {
    return { todo: [], doing: [], done: [] };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { todo: [], doing: [], done: [] };
  } catch {
    return { todo: [], doing: [], done: [] };
  }
}

export function saveBoard(board: Board): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch (error) {
    console.error('Failed to save board:', error);
  }
}

export function addTask(columnId: keyof Board, task: Task): Board {
  const board = getBoard();
  board[columnId].push(task);
  saveBoard(board);
  return board;
}

export function deleteTask(columnId: keyof Board, taskId: string): Board {
  const board = getBoard();
  board[columnId] = board[columnId].filter(task => task.id !== taskId);
  saveBoard(board);
  return board;
}

export function moveTask(
  sourceColumnId: keyof Board,
  destinationColumnId: keyof Board,
  sourceIndex: number,
  destinationIndex: number
): Board {
  const board = getBoard();
  const [movedTask] = board[sourceColumnId].splice(sourceIndex, 1);
  board[destinationColumnId].splice(destinationIndex, 0, movedTask);
  saveBoard(board);
  return board;
}
