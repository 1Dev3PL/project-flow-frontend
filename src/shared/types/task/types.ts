import { Project, User } from "shared/types";

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
  project: Project;
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  status: ETaskStatus;
  author: User;
  executor: User | null;
  createdDate: string;
  updatedDate: string;
};
