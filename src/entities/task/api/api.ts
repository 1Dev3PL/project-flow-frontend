import { apiInstance } from "shared/api";
import { Task, TasksListData } from "entities/task/api/types.ts";

export const getTasks = async (
  projectId: number,
  { page }: { page: number },
): Promise<TasksListData> => {
  return await apiInstance
    .get(`/tasks?projectId=${projectId}&page=${page}`)
    .then((res) => res.data);
};

export const getTask = async (taskId: number): Promise<Task> => {
  return await apiInstance.get(`/tasks/${taskId}`).then((res) => res.data);
};
