export type TaskStatus = 'in_progress' | 'completed';

export interface Tag {
  id: string;
  name: string;
  description?: string;
}

export interface Task {
  id: string;
  description: string;
  task_description?: string;
  status: TaskStatus;
  created_at: string;
  tags: Tag[];
} 