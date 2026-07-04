'use client';

import { useState } from 'react';
import { Task } from '@/app/lib/storage';

interface AddTaskFormProps {
  columnId: string;
  onAdd: (task: Task) => void;
}

export default function AddTaskForm({ columnId, onAdd }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const newTask: Task = {
      id: `${columnId}-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
    };

    onAdd(newTask);
    setTitle('');
    setDescription('');
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          + Add Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
