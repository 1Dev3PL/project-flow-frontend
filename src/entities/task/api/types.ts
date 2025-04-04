export enum ETaskType {
  TASK = "TASK",
  BUG = "BUG",
  STORY = "STORY",
  EPIC = "EPIC",
  SUBTASK = "SUBTASK",
}

export enum ETaskPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum ETaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  TESTING = "TESTING",
  COMPLETE = "COMPLETE",
}

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
