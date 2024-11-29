import { useTasksQuery, useTaskMutations } from './useGraphQL'
import { TaskStatus } from '../types/task';

export const useTaskController = () => {
  const { tasks, loading, error, refetch } = useTasksQuery()
  const { createTask: createTaskMutation, updateTaskStatus } = useTaskMutations()

  const addTask = async (description: string) => {
    await createTaskMutation(description)
    refetch()
  }

  const toggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      const newStatus = task.status === 'completed' ? 'in_progress' : 'completed'
      await updateTaskStatus(task.id, newStatus)
      refetch()
    }
  }

  const getPendingTasks = () => tasks.filter(task => task.status === 'in_progress')
  const getCompletedTasks = () => tasks.filter(task => task.status === 'completed')

  const deleteCompletedTasks = async () => {
    const completedTasks = getCompletedTasks()
    await Promise.all(
      completedTasks.map(task => updateTaskStatus(task.id, 'in_progress'))
    )
    refetch()
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    getPendingTasks,
    getCompletedTasks,
    deleteCompletedTasks
  }
}