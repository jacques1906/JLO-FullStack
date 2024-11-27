import { Task } from '../../../types/task'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  return (
    <li className="flex items-center gap-4 p-4 bg-tertiary rounded-lg">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 accent-accent"
      />
      <span className={`flex-1 ${task.completed ? 'line-through opacity-50' : ''}`}>
        {task.text}
      </span>
      <span className="text-sm opacity-50">
        {task.createdAt.toLocaleDateString()}
      </span>
    </li>
  )
}

export default TaskItem 