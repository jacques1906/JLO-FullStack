import { useTasksQuery, useTaskMutations } from './useGraphQL'
import { TaskStatus, Task } from '../types/task';

export const useTaskController = () => {
  const { tasks, loading, error, refetch } = useTasksQuery();
  const { createTask, updateTaskStatus, deleteCompletedTasks: deleteCompletedTasksMutation } = useTaskMutations();

  const addTask = async (description: string, task_description: string, tagIds: string[] = []): Promise<Task> => {
    try {
      console.log('Adding task:', { description, task_description, tagIds });
      const result = await createTask(description, task_description, tagIds);
      if (!result) {
        throw new Error('No result returned from createTask');
      }
      console.log('Task added:', result);
      await refetch();
      return result;
    } catch (error) {
      console.error('Error details:', error);
      throw error;
    }
  }

  const toggleTask = async (taskId: string): Promise<void> => {
    const task = tasks.find((t: Task) => t.id === taskId);
    if (task) {
      const newStatus: TaskStatus = task.status === 'completed' ? 'in_progress' : 'completed';
      await updateTaskStatus(task.id, newStatus);
      refetch();
    }
  }

  const getPendingTasks = () => tasks.filter((task: Task) => task.status === 'in_progress');
  const getCompletedTasks = () => tasks.filter((task: Task) => task.status === 'completed');

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