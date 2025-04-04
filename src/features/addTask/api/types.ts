import { ETaskPriority, ETaskType } from "entities/task";

export type TAddTaskRequestData = {
  projectId: string;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  authorId: string;
  executorId?: string;
};
