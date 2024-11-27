import { useState } from 'react'

interface TaskFormProps {
  onSubmit: (text: string) => void
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [newTask, setNewTask] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      onSubmit(newTask.trim())
      setNewTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une nouvelle tâche..."
          className="flex-1 px-4 py-3 rounded-lg bg-tertiary text-text placeholder-text/50 border-2 border-accent/20 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
        />
        <button 
          type="submit"
          className="px-6 py-3 bg-accent text-background font-medium rounded-lg shadow-sm hover:shadow-md hover:bg-accent/90 active:bg-accent/80 focus:ring-2 focus:ring-accent/50 focus:outline-none transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          Ajouter
        </button>
      </div>
    </form>
  )
}

export default TaskForm 