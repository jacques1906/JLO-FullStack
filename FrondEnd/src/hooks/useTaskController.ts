import { useState, useCallback, useRef } from 'react'
import { TaskController } from '../controllers/TaskController'
import { Task } from '../types/task'

export const useTaskController = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const controllerRef = useRef<TaskController>()

  if (!controllerRef.current) {
    controllerRef.current = new TaskController(() => {
      setTasks([...controllerRef.current!.getTasks()])
    })
  }

  const updateTasks = useCallback(() => {
    controllerRef.current!.fetchTasks()
  }, [])

  return {
    tasks,
    controller: controllerRef.current,
    updateTasks
  }
}