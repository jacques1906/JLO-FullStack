import { useEffect } from 'react'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'
import TaskHeader from './TaskHeader'
import Notification from '../common/Notification'
import { useNotification } from '../../../hooks/useNotification'
import { useTaskController } from '../../../hooks/useTaskController'

interface TaskListProps {
  showPendingOnly?: boolean
  showCompletedOnly?: boolean
}

const TaskList = ({ showPendingOnly, showCompletedOnly }: TaskListProps) => {
  const { notification, showNotification, hideNotification, pauseNotificationTimer, resumeNotificationTimer } = useNotification()
  const { tasks, controller, updateTasks } = useTaskController()

  useEffect(() => {
    updateTasks()
  }, [])

  const handleAddTask = (text: string) => {
    controller.addTask(text)
    showNotification('Nouvelle tâche ajoutée')
  }

  const handleToggleTask = (taskId: number) => {
    controller.toggleTask(taskId)
    showNotification('Statut de la tâche mis à jour')
  }

  const handleDeleteCompleted = () => {
    controller.deleteCompletedTasks()
    showNotification('Toutes les tâches terminées ont été supprimées')
  }

  if (!showPendingOnly && !showCompletedOnly) {
    const pendingTasks = controller.getPendingTasks()
    const completedTasks = controller.getCompletedTasks()

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
        <TaskForm onSubmit={handleAddTask} />
        
        <div className="space-y-8">
          <div className="space-y-6">
            <TaskHeader title="Tâches en cours" showDeleteButton={false} onDeleteAll={() => {}} />
            <ul className="space-y-3">
              {pendingTasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <TaskHeader 
              title="Tâches terminées" 
              showDeleteButton={completedTasks.length > 0}
              onDeleteAll={handleDeleteCompleted}
            />
            <ul className="space-y-3">
              {completedTasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const filteredTasks = showPendingOnly 
    ? controller.getPendingTasks()
    : showCompletedOnly 
    ? controller.getCompletedTasks()
    : tasks

  const pageTitle = showCompletedOnly 
    ? "Tâches terminées"
    : showPendingOnly 
    ? "Tâches en cours"
    : "Toutes les tâches"

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
  )
}

export default TaskList 