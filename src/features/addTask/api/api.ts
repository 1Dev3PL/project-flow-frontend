import { apiInstance } from "shared/api";
import { TAddTaskRequestData } from "./types.ts";
import { Task } from "shared/types";

export const addTask = async (task: TAddTaskRequestData): Promise<Task> => {
  return await apiInstance.post("/tasks", task).then((res) => res.data);
};
