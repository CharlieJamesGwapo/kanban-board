import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/app/lib/storage';

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: string;
  onDelete: () => void;
}

export default function TaskCard({
  task,
  index,
  columnId,
  onDelete,
}: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 rounded-lg shadow transition-all ${
            snapshot.isDragging
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{task.title}</h3>
              {task.description && (
                <p className={`text-sm ${snapshot.isDragging ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {task.description}
                </p>
              )}
            </div>
            <button
              onClick={onDelete}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                snapshot.isDragging
                  ? 'bg-blue-400 hover:bg-blue-300'
                  : 'bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-200'
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
