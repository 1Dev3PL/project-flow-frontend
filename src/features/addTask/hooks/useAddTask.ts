import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api.ts";
import { TAddTaskRequestData } from "../api/types.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Task } from "entities/task";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  const { mutate: addTaskMutation, isPending } = useMutation<
    Task,
    AxiosError,
    TAddTaskRequestData
  >({
    mutationFn: (task: TAddTaskRequestData) => api(task),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
