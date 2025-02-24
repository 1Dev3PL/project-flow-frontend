import { ETaskPriority, ETaskType } from "shared/constants/task.ts";

export type AddTaskRequestData = {
  projectId: string;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  authorId: string;
  executorId?: string;
};
