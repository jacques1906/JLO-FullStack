import { Task } from '../../../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  return (
    <li className="flex items-center gap-4 p-4 bg-tertiary rounded-lg">
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 accent-accent"
      />
      <span className={`flex-1 ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
        {task.description}
      </span>
      <span className="text-sm opacity-50">
        {new Date(task.created_at).toLocaleDateString()}
      </span>
    </li>
  )
}

export default TaskItem 