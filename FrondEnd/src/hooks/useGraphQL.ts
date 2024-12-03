import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { TaskStatus } from '../types/task';

const TASK_FIELDS = `
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
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      ${TASK_FIELDS}
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($description: String!, $task_description: String, $tag_ids: [ID!]) {
    createTask(description: $description, task_description: $task_description, tag_ids: $tag_ids) {
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

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      id
      name
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export const DELETE_COMPLETED_TASKS = gql`
  mutation DeleteCompletedTasks {
    deleteCompletedTasks {
      count
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      name
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
  const [deleteTaskMutation] = useMutation(DELETE_TASK);
  const [deleteCompletedTasksMutation] = useMutation(DELETE_COMPLETED_TASKS);

  const createTask = async (description: string, task_description: string, tagIds: string[] = []) => {
    const { data } = await createTaskMutation({ 
      variables: { 
        description,
        task_description,
        tag_ids: tagIds 
      } 
    });
    return data.createTask;
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    const { data } = await updateTaskStatusMutation({ 
      variables: { id, status } 
    });
    return data.updateTaskStatus;
  };

  const deleteTask = async (id: string) => {
    const { data } = await deleteTaskMutation({ 
      variables: { id } 
    });
    return data.deleteTask;
  };

  const deleteCompletedTasks = async () => {
    const { data } = await deleteCompletedTasksMutation();
    return data.deleteCompletedTasks;
  };

  return {
    createTask,
    updateTaskStatus,
    deleteTask,
    deleteCompletedTasks
  };
}

export function useTagMutations() {
  const [createTagMutation] = useMutation(CREATE_TAG);
  const [deleteTagMutation] = useMutation(DELETE_TAG);

  const createTag = async (name: string) => {
    const { data } = await createTagMutation({ 
      variables: { name } 
    });
    return data.createTag;
  };

  const deleteTag = async (id: string) => {
    const { data } = await deleteTagMutation({ 
      variables: { id } 
    });
    return data.deleteTag;
  };

  return {
    createTag,
    deleteTag
  };
} 