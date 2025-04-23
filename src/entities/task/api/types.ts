import { ETaskPriority, ETaskStatus, ETaskType } from "shared/types";

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
