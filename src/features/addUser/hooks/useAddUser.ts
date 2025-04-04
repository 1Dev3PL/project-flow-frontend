import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IMessageResponse } from "shared/api";
import { AxiosError } from "axios";
import { TAddUserRequestData } from "features/addUser/api/types.ts";
import { addUser } from "features/addUser/api/api.ts";
import toast from "react-hot-toast";

type TAddUserData = {
  projectId: string;
  userData: TAddUserRequestData;
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const { mutate: addUserMutation, isPending } = useMutation<
    IMessageResponse,
    AxiosError,
    TAddUserData
  >({
    mutationFn: ({ projectId, userData }) => addUser(projectId, userData),
    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["users", projectId],
      });
    },
    onSuccess: () => {
      toast.success(`Пользователь добавлен`);
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.error(`Пользователь уже добавлен в проект`);
      } else if (error.response?.status === 404) {
        toast.error(`Пользователь не найден`);
      } else {
        toast.error(`Что-то пошло не так`);
      }
    },
  });

  return { addUserMutation, isPending };
};
