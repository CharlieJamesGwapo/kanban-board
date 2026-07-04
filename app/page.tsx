'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskColumn from './components/TaskColumn';
import AddTaskForm from './components/AddTaskForm';
import DarkModeToggle from './components/DarkModeToggle';
import { Board, Task, getBoard, saveBoard, deleteTask, moveTask } from './lib/storage';

export default function Home() {
  const [board, setBoard] = useState<Board>({ todo: [], doing: [], done: [] });
  const [isMounted, setIsMounted] = useState(false);

  // Load board from localStorage on client mount
  useEffect(() => {
    setIsMounted(true);
    const loadedBoard = getBoard();
    setBoard(loadedBoard);
  }, []);

  const handleAddTask = (columnId: string, task: Task) => {
    const newBoard = { ...board };
    (newBoard[columnId as keyof Board] as Task[]).push(task);
    setBoard(newBoard);
    saveBoard(newBoard);
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    const newBoard = deleteTask(columnId as keyof Board, taskId);
    setBoard(newBoard);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // No movement
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newBoard = moveTask(
      source.droppableId as keyof Board,
      destination.droppableId as keyof Board,
      source.index,
      destination.index
    );

    setBoard(newBoard);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Kanban Board
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Organize your tasks with drag and drop
              </p>
            </div>
            <DarkModeToggle />
          </div>
        </div>

        {/* Board */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Todo Column */}
            <div>
              <TaskColumn
                columnId="todo"
                title="Todo"
                tasks={board.todo}
                onDeleteTask={(taskId) => handleDeleteTask('todo', taskId)}
              />
              <AddTaskForm
                columnId="todo"
                onAdd={(task) => handleAddTask('todo', task)}
              />
            </div>

            {/* Doing Column */}
            <div>
              <TaskColumn
                columnId="doing"
                title="Doing"
                tasks={board.doing}
                onDeleteTask={(taskId) => handleDeleteTask('doing', taskId)}
              />
              <AddTaskForm
                columnId="doing"
                onAdd={(task) => handleAddTask('doing', task)}
              />
            </div>

            {/* Done Column */}
            <div>
              <TaskColumn
                columnId="done"
                title="Done"
                tasks={board.done}
                onDeleteTask={(taskId) => handleDeleteTask('done', taskId)}
              />
              <AddTaskForm
                columnId="done"
                onAdd={(task) => handleAddTask('done', task)}
              />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
