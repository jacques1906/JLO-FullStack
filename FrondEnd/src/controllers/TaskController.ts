import { Task } from '../types/task'
import { MockApiService } from '../services/MockApiService'

export class TaskController {
  private tasks: Task[] = []
  private notifyChange: () => void

  constructor(notifyChange: () => void) {
    this.notifyChange = notifyChange
    this.fetchTasks()
  }

  getTasks(): Task[] {
    return this.tasks
  }

  getPendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed)
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter(task => task.completed)
  }

  async fetchTasks(): Promise<void> {
    this.tasks = await MockApiService.getTasks()
    this.notifyChange()
  }

  async addTask(text: string): Promise<void> {
    const newTask = await MockApiService.addTask(text)
    this.tasks.push(newTask)
    this.notifyChange()
  }

  async toggleTask(taskId: number): Promise<void> {
    const task = this.tasks.find(t => t.id === taskId)
    if (task) {
      const updatedTask = await MockApiService.updateTask(taskId, !task.completed)
      const index = this.tasks.findIndex(t => t.id === taskId)
      this.tasks[index] = updatedTask
      this.notifyChange()
    }
  }

  async deleteCompletedTasks(): Promise<void> {
    await MockApiService.deleteCompletedTasks()
    this.tasks = this.tasks.filter(task => !task.completed)
    this.notifyChange()
  }
}