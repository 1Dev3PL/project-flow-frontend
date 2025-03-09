import {
  ETaskPriority,
  ETaskStatus,
  ETaskType,
} from "shared/constants/task.ts";

export type Task = {
  id: string;
  key: string;
  projectId: string;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  status: ETaskStatus;
  authorId: string;
  executorId?: string;
  createdDate: string;
  updatedDate: string;
};

export type TasksListData = {
  pagesCount: number;
  tasks: Task[];
};

export enum ESortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ESortBy {
  TITLE = "title",
  CREATED_DATE = "createdDate",
}

export type TSortOptions = [ESortOrder, ESortBy] | null;

export type TUpdateTaskRequestData = {
  title?: string;
  description?: string;
  type?: ETaskType;
  priority?: ETaskPriority;
  status?: ETaskStatus;
  executorId?: string;
}
