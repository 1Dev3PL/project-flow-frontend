import { useMutation, useQueryClient } from "@tanstack/react-query";
import { excludeUser } from "features/excludeUser/api/api.ts";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type TExcludeUserData = {
  projectId: string;
  userId: string;
};

export const useExcludeUser = () => {
  const queryClient = useQueryClient();

  const { mutate: excludeUserMutation, isPending } = useMutation<
    void,
    AxiosError,
    TExcludeUserData
  >({
    mutationFn: ({ projectId, userId }) => excludeUser(projectId, userId),
    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["users", projectId] });
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onSuccess: () => {
      toast.success(`Пользователь исключен`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { excludeUserMutation, isPending };
};
