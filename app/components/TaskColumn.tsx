import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Task } from '@/app/lib/storage';

interface TaskColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export default function TaskColumn({
  columnId,
  title,
  tasks,
  onDeleteTask,
}: TaskColumnProps) {
  return (
    <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {title} ({tasks.length})
      </h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 rounded-lg transition-colors ${
              snapshot.isDraggingOver
                ? 'bg-blue-50 dark:bg-blue-900'
                : ''
            }`}
            style={{ minHeight: '300px' }}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                columnId={columnId}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
