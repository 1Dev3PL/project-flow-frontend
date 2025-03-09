import { apiInstance } from "shared/api";
import {
  Task,
  TasksListData,
  TSortOptions,
  TUpdateTaskRequestData,
} from "entities/task/api/types.ts";

export const getTasks = async (
  projectId: string,
  { page }: { page: number },
  sortOptions: TSortOptions | null,
): Promise<TasksListData> => {
  return await apiInstance
    .get(
      `/tasks?projectId=${projectId}&page=${page}&sortOrder=${sortOptions ? sortOptions[0] : ""}&sortBy=${sortOptions ? sortOptions[1] : ""}`,
    )
    .then((res) => res.data);
};

export const getTask = async (taskId: string): Promise<Task> => {
  return await apiInstance.get(`/tasks/${taskId}`).then((res) => res.data);
};

export const updateTask = async (
  taskId: string,
  taskData: TUpdateTaskRequestData,
): Promise<Task> => {
  return await apiInstance
    .patch(`/tasks/${taskId}`, taskData)
    .then((res) => res.data);
};
