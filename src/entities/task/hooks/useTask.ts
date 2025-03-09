import { useQuery } from "@tanstack/react-query";
import { getTask } from "entities/task/api/api.ts";
import { Task } from "entities/task";

export const useTask = (taskId: string | null) => {
  const { data: task, isLoading } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId!),
    enabled: !!taskId,
  });

  return { task, isLoading };
};
