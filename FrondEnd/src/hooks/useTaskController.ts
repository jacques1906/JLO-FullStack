import { useTasksQuery, useTaskMutations } from './useGraphQL'
import { TaskStatus, Task } from '../types/task';

export const useTaskController = () => {
  const { tasks, loading, error, refetch } = useTasksQuery();
  const { createTask: createTaskMutation, updateTaskStatus, deleteCompletedTasks: deleteCompletedTasksMutation } = useTaskMutations();

  const addTask = async (description: string, tagIds: string[] = []) => {
    await createTaskMutation(description, tagIds)
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
    try {
      await deleteCompletedTasksMutation();
      await refetch();
    } catch (error) {
      console.error('Erreur lors de la suppression des tâches:', error);
      throw error;
    }
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