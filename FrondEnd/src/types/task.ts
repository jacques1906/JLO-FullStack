export type TaskStatus = 'in_progress' | 'completed';

export interface Tag {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
} 