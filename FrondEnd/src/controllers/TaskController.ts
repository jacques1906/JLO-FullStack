import { Task, TaskStatus } from '../types/task'
import { useTasksQuery, useTaskMutations } from '../hooks/useGraphQL'

export function useTaskController() {
  const { tasks, loading, error, refetch } = useTasksQuery()
  const { createTask, updateTaskStatus } = useTaskMutations()

  const addTask = async (description: string) => {
    await createTask({ variables: { description } })
    refetch()
  }

  const toggleTask = async (taskId: string) => {
    const task = tasks?.find(t => t.id === taskId)
    if (task) {
      const newStatus = task.status === 'completed' ? 'in_progress' : 'completed'
      await updateTaskStatus({ variables: { id: taskId, status: newStatus } })
      refetch()
    }
  }

  const getPendingTasks = () => tasks?.filter(task => task.status === 'in_progress') || []
  const getCompletedTasks = () => tasks?.filter(task => task.status === 'completed') || []

  const deleteCompletedTasks = async () => {
    const completedTasks = tasks?.filter(task => task.status === 'completed') || []
    for (const task of completedTasks) {
      await updateTaskStatus({ variables: { id: task.id, status: 'in_progress' } })
    }
    await refetch()
  }

  return {
    tasks: tasks || [],
    loading,
    error,
    addTask,
    toggleTask,
    getPendingTasks,
    getCompletedTasks,
    deleteCompletedTasks,
    refetch
  }
}