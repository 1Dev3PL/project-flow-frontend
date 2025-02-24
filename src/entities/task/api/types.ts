import {
  ETaskPriority,
  ETaskStatus,
  ETaskType,
} from "shared/constants/task.ts";

export type Task = {
  id: string;
  key: string;
  projectId: number;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  status: ETaskStatus;
  authorId: number;
  executorId?: number;
  createdDate: string;
  updatedDate: string;
};

export type TasksListData = {
  pagesCount: number;
  tasks: Task[];
};
