import { Task } from "../types/task";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let mockDatabase: Task[] = [];

export class MockApiService {
  static async getTasks(): Promise<Task[]> {
    console.log('Récupération des tâches depuis l\'API...');
    await delay(500);
    console.log('Tâches récupérées:', mockDatabase);
    return [...mockDatabase];
  }

  static async addTask(text: string): Promise<Task> {
    console.log('Ajout d\'une nouvelle tâche:', text);
    await delay(300);
    const newTask: Task = {
      id: mockDatabase.length + 1,
      text,
      completed: false,
      createdAt: new Date()
    };
    mockDatabase.push(newTask);
    console.log('Tâche ajoutée avec succès:', newTask);
    return newTask;
  }

  static async updateTask(taskId: number, completed: boolean): Promise<Task> {
    console.log('Modification de la tâche:', taskId, 'completed:', completed);
    await delay(300);
    const task = mockDatabase.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    task.completed = completed;
    console.log('Tâche mise à jour avec succès:', task);
    return { ...task };
  }

  static async deleteCompletedTasks(): Promise<void> {
    console.log('Suppression des tâches terminées...');
    await delay(300);
    const initialCount = mockDatabase.length;
    mockDatabase = mockDatabase.filter(task => !task.completed);
    const deletedCount = initialCount - mockDatabase.length;
    console.log(deletedCount, 'tâches supprimées avec succès');
  }
} 