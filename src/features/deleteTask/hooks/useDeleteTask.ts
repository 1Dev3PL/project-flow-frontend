import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { deleteTask } from "features/deleteTask/api/api.ts";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

type TDeleteTaskData = {
  taskId: string;
};

export const useDeleteTask = () => {
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );
  const queryClient = useQueryClient();

  const { mutate: deleteTaskMutation, isPending } = useMutation<
    void,
    AxiosError,
    TDeleteTaskData
  >({
    mutationFn: ({ taskId }) => deleteTask(taskId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", currentProjectId],
      });
    },
    onSuccess: () => {
      toast.success(`Задача удалена`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { deleteTaskMutation, isPending };
};
