import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInData } from "pages/login/api/types.ts";
import { signIn } from "pages/login/api/signIn.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { User } from "entities/user";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const removeCurrentProjectId = useCurrentProjectStore(
    (state) => state.removeCurrentProjectId,
  );

  const { mutate: signInMutation, isPending } = useMutation<
    User,
    AxiosError,
    SignInData
  >({
    mutationFn: (signInData) => signIn(signInData),
    onMutate: () => {
      queryClient.removeQueries();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
      removeCurrentProjectId();
      navigate("/");
    },
    onError: (error) => {
      if (error.response?.status === 400)
        toast.error("Неправильная почта или пароль");
      else if (error.response?.status === 403)
        toast.error("Аккаунт пользователя не подтвержден");
      else toast.error("Что-то пошло не так");
    },
  });

  return { signInMutation, isPending };
};
