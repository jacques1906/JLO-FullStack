import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import { Task, TaskStatus } from '../types/task';

export class GraphQLService {
  static async getTasks(): Promise<Task[]> {
    const { data } = await client.query({
      query: gql`
        query GetTasks {
          tasks {
            id
            description
            task_description
            status
            created_at
            updated_at
            tags {
              id
              name
            }
          }
        }
      `
    });
    
    return data.tasks;
  }

  static async addTask(description: string): Promise<Task> {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateTask($description: String!) {
          createTask(description: $description) {
            id
            description
            status
            created_at
            updated_at
            tags {
              id
              name
            }
          }
        }
      `,
      variables: { description }
    });
    return data.createTask;
  }

  static async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UpdateTask($id: ID!, $status: TaskStatus!) {
          updateTaskStatus(id: $id, status: $status) {
            id
            description
            status
            created_at
            updated_at
          }
        }
      `,
      variables: { id, status }
    });
    return data.updateTaskStatus;
  }

  static async deleteCompletedTasks(): Promise<void> {
    const { data } = await client.query({
      query: gql`
        query GetCompletedTasks {
          tasks {
            id
            status
          }
        }
      `
    });
    
    const completedTasks = data.tasks.filter((task: Task) => task.status === 'completed');
    
    for (const task of completedTasks) {
      await this.updateTaskStatus(task.id, 'in_progress');
    }
  }
} 