import { apiInstance } from "shared/api";
import { TDashboardTasksResponse } from "pages/dashboard/api/types.ts";

export const getDashboardTasks = async (
  projectId: string,
): Promise<TDashboardTasksResponse> => {
  return await apiInstance
    .get(`/tasks/dashboard?projectId=${projectId}`)
    .then((res) => res.data);
};
