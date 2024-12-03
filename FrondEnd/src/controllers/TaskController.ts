import { Task, TaskStatus } from '../types/task'
import { useTasksQuery, useTaskMutations } from '../hooks/useGraphQL'

export function useTaskController() {
  const { tasks, loading, error, refetch } = useTasksQuery()
  const { createTask, updateTaskStatus } = useTaskMutations()

  const addTask = async (description: string, taskDescription: string, tagIds: string[] = []) => {
    try {
      console.log('Controller input:', { description, taskDescription, tagIds });
      
      const result = await createTask(
        description,
        taskDescription || '',
        tagIds
      );
      
      console.log('Controller result:', result);
      await refetch();
      return result;
    } catch (error) {
      console.error('Controller error:', error);
      throw error;
    }
  }

  const toggleTask = async (taskId: string) => {
    const task = tasks?.find((t: Task) => t.id === taskId)
    if (task) {
      const newStatus: TaskStatus = task.status === 'completed' ? 'in_progress' : 'completed'
      await updateTaskStatus(task.id, newStatus)
      refetch()
    }
  }

  const getPendingTasks = () => tasks?.filter((task: Task) => task.status === 'in_progress') || []
  const getCompletedTasks = () => tasks?.filter((task: Task) => task.status === 'completed') || []

  const deleteCompletedTasks = async () => {
    const completedTasks = tasks?.filter((task: Task) => task.status === 'completed') || []
    for (const task of completedTasks) {
      await updateTaskStatus(task.id, 'in_progress')
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