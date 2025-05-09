import { ETaskStatus, Task } from "shared/types";

export type TDashboardTasksResponse = {
  open: Task[];
  in_progress: Task[];
  review: Task[];
  testing: Task[];
  complete: Task[];
};

export type TTaskPositionRequestData = {
  taskId: string;
  status?: ETaskStatus;
  afterId: string | null;
  beforeId: string | null;
}
