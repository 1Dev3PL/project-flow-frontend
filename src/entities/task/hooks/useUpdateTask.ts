import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "entities/task/api/api.ts";
import { AxiosError } from "axios";
import { Task } from "entities/task";
import toast from "react-hot-toast";
import { TUpdateTaskRequestData } from "entities/task/api/types.ts";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

type TUpdateTaskData = {
  taskId: string;
} & TUpdateTaskRequestData;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const currentProjectId = useCurrentProjectStore((state) => state.currentProjectId)

  const { mutate: updateTaskMutation, isPending } = useMutation<
    Task,
    AxiosError,
    TUpdateTaskData,
    { previousTask?: Task }
  >({
    mutationFn: ({ taskId, ...taskData }) => updateTask(taskId, taskData),
    onMutate: async ({ taskId, ...taskData }) => {
      await queryClient.cancelQueries({
        queryKey: ["task", taskId],
      });

      const previousTask: Task | undefined = queryClient.getQueryData([
        "task",
        taskId,
      ]);

      queryClient.setQueryData(["task", taskId], (oldTask: Task) => ({
        ...oldTask,
        ...taskData,
      }));

      return { previousTask };
    },
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ["task", task.id] });
      queryClient.invalidateQueries({ queryKey: ["tasks", currentProjectId] });
      toast.success(`Изменения сохранены`);
    },
    onError: (_, __, context) => {
      if (context?.previousTask) {
        queryClient.setQueryData(
          ["task", context.previousTask.id],
          context.previousTask,
        );
      }
      toast.error(`Что-то пошло не так`);
    },
  });

  return { updateTaskMutation, isPending };
};
