import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "entities/task/api/api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { TUpdateTaskRequestData } from "entities/task/api/types.ts";
import { Task, User } from "shared/types";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

type TUpdateTaskData = {
  taskId: string;
  executor?: User | null;
} & TUpdateTaskRequestData;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );

  const { mutate: updateTaskMutation, isPending } = useMutation<
    Task,
    AxiosError,
    TUpdateTaskData,
    { previousTask?: Task }
  >({
    mutationFn: ({ taskId, executor, ...taskData }) =>
      updateTask(taskId, taskData),
    onMutate: async ({ taskId, executorId, ...taskData }) => {
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
    onSettled: (_, __, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tasks", currentProjectId] });
    },
    onSuccess: () => {
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
