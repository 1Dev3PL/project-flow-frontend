import { apiInstance } from "shared/api";
import {
  TDashboardTasksResponse,
  TTaskPositionRequestData,
} from "pages/dashboard/api/types.ts";

export const getDashboardTasks = async (
  projectId: string,
): Promise<TDashboardTasksResponse> => {
  return await apiInstance
    .get(`/tasks/dashboard?projectId=${projectId}`)
    .then((res) => res.data);
};

export const changeTaskPosition = async (
  taskPositionData: TTaskPositionRequestData,
): Promise<void> => {
  return await apiInstance
    .post(`/tasks/dashboard/change-position`, taskPositionData)
    .then((res) => res.data);
};
