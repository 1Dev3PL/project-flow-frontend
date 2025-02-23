import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "features/addTaskButton/api/api.ts";
import { AddTaskRequestData } from "features/addTaskButton/api/types.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Task } from "entities/task";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  const { mutate: addTaskMutation, isPending } = useMutation<
    Task,
    AxiosError,
    AddTaskRequestData
  >({
    mutationFn: (task: AddTaskRequestData) => api(task),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(`Задача ${data.title} добавлена`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { addTaskMutation, isPending };
};
