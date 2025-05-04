import { Task } from "shared/types";

export type TDashboardTasksResponse = {
  open: Task[];
  in_progress: Task[];
  review: Task[];
  testing: Task[];
  complete: Task[];
};
