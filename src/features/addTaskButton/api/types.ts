import { ETaskPriority, ETaskType } from "shared/constants/task.ts";

export type AddTaskRequestData = {
  projectId: number;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  authorId: number;
  executorId?: number;
};
