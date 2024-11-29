import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Task, TaskStatus } from '../types/task';

const TASK_FIELDS = `
  id
  description
  status
  created_at
  updated_at
  tags {
    id
    name
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      ${TASK_FIELDS}
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($description: String!) {
    createTask(description: $description) {
      ${TASK_FIELDS}
    }
  }
`;

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: ID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      ${TASK_FIELDS}
    }
  }
`;

export function useTasksQuery() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  return {
    tasks: data?.tasks || [],
    loading,
    error,
    refetch
  };
}

export function useTaskMutations() {
  const [createTaskMutation] = useMutation(CREATE_TASK);
  const [updateTaskStatusMutation] = useMutation(UPDATE_TASK_STATUS);

  const createTask = async (description: string) => {
    const { data } = await createTaskMutation({ variables: { description } });
    return data.createTask;
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    const { data } = await updateTaskStatusMutation({ variables: { id, status } });
    return data.updateTaskStatus;
  };

  return {
    createTask,
    updateTaskStatus
  };
} 