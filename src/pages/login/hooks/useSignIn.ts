import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInData } from "pages/login/api/types.ts";
import { signIn } from "pages/login/api/signIn.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { User } from "entities/user";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInMutation, isPending } = useMutation<
    User,
    AxiosError,
    SignInData
  >({
    mutationFn: (signInData) => signIn(signInData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/");
    },
    onError: (error) => {
      if (error.response?.status === 400)
        toast.error("Неправильная почта или пароль");
      else toast.error("Что-то пошло не так");
    },
  });

  return { signInMutation, isPending };
};
