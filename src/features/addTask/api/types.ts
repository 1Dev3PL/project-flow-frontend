import { ETaskPriority, ETaskType } from "shared/types";

export type TAddTaskRequestData = {
  projectId: string;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  authorId: string;
  executorId?: string;
};
