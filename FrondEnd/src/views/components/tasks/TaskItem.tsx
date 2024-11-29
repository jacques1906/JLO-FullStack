import { Task } from '../../../types/task'
import TaskTag from './TaskTag'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const formattedDate = new Date(task.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 rounded border-accent/20"
          />
          <div className="flex flex-col">
            <span className={`${task.status === 'completed' ? 'line-through text-text/50' : ''}`}>
              tâche: {task.description}
            </span>
            {task.task_description && (
              <span className="text-sm text-text/70 mt-1 italic">
                description détaillée: {task.task_description}
              </span>
            )}
          </div>
        </div>
        {task.tags && task.tags.length > 0 && (
          <div className="flex items-center gap-2 ml-7">
            <span className="text-sm text-text/70">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {task.tags.map(tag => (
                <TaskTag 
                  key={tag.id} 
                  name={tag.name} 
                  description={tag.description}
                />
              ))}
            </div>
          </div>
        )}
        <div className="text-sm text-text/50 ml-7">
          Créée le {formattedDate}
        </div>
      </div>
    </div>
  )
}

export default TaskItem 