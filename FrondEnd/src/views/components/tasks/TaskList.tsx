import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import TaskHeader from './TaskHeader'
import Notification from '../common/Notification'
import { useNotification } from '../../../hooks/useNotification'
import { useTaskController } from '../../../hooks/useTaskController'
import { Task } from '../../../types/task'

interface TaskListProps {
  showPendingOnly?: boolean
  showCompletedOnly?: boolean
}

const TaskList = ({ showPendingOnly = false, showCompletedOnly = false }: TaskListProps) => {
  const { notification, showNotification, hideNotification, pauseNotificationTimer, resumeNotificationTimer } = useNotification();
  const { 
    tasks,
    loading, 
    error, 
    addTask, 
    toggleTask, 
    getPendingTasks, 
    getCompletedTasks, 
    deleteCompletedTasks 
  } = useTaskController();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  const handleAddTask = async (description: string, tagIds: string[] = []) => {
    await addTask(description, tagIds);
    showNotification('Nouvelle tâche ajoutée');
  };

  const handleToggleTask = async (taskId: string) => {
    await toggleTask(taskId);
    showNotification('Statut de la tâche mis à jour');
  };

  const handleDeleteCompleted = async () => {
    await deleteCompletedTasks();
    showNotification('Toutes les tâches terminées ont été supprimées');
  };

  const filteredTasks: Task[] = showPendingOnly 
    ? getPendingTasks()
    : showCompletedOnly 
    ? getCompletedTasks()
    : tasks;

  const pageTitle = showCompletedOnly 
    ? "Tâches terminées"
    : showPendingOnly 
    ? "Tâches en cours"
    : "Toutes les tâches";

  return (
    <div className="space-y-8">
      {notification && (
        <Notification 
          message={notification} 
          onClose={hideNotification}
          onMouseEnter={pauseNotificationTimer}
          onMouseLeave={resumeNotificationTimer}
        />
      )}
      {!showCompletedOnly && <TaskForm onSubmit={handleAddTask} />}
      <div className="space-y-6">
        <TaskHeader 
          title={pageTitle}
          showDeleteButton={!!(showCompletedOnly && filteredTasks.length > 0)}
          onDeleteAll={handleDeleteCompleted}
        />
        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList; 