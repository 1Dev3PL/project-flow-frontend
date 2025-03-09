import { apiInstance } from "shared/api";
import { AddTaskRequestData } from "./types.ts";
import { Task } from "entities/task";

export const api = async (task: AddTaskRequestData): Promise<Task> => {
  return await apiInstance.post("/tasks", task).then((res) => res.data);
};
