import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/api.ts";
import { TAddTaskRequestData } from "../api/types.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Task } from "shared/types";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  const { mutate: addTaskMutation, isPending } = useMutation<
    Task,
    AxiosError,
    TAddTaskRequestData
  >({
    mutationFn: (task: TAddTaskRequestData) => addTask(task),
    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onSuccess: (data) => {
      toast.success(`Задача ${data.title} добавлена`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { addTaskMutation, isPending };
};
