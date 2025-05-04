import { useQuery } from "@tanstack/react-query";
import { getDashboardTasks } from "pages/dashboard/api/api.ts";
import { Task } from "shared/types";

export type TDashboardTasks = Record<string, Task[]>;

export const useDashboardTasks = (
  projectId: string | null,
) => {
  const {
    data: dashboardTasks,
    isLoading,
  } = useQuery<TDashboardTasks>({
    queryKey: ["tasks", projectId, "dashboard"],
    queryFn: () =>
      getDashboardTasks(projectId!),
    select: (res) => Object.keys(res).reduce((acc, key) => {
      acc[key.toUpperCase()] = res[key as keyof typeof res];
      return acc;
    }, {} as TDashboardTasks),
    enabled: !!projectId
  });

  return {
    dashboardTasks,
    isLoading
  };
};
