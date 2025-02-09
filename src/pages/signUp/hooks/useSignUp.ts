import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "pages/signUp/api/signUp.ts";
import { SignUpData } from "pages/signUp/api/types.ts";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { User } from "entities/user";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUpMutation } = useMutation<User, AxiosError, SignUpData>({
    mutationFn: (signUpData) => signUp(signUpData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409)
        toast.error("Пользователь с таким email уже существует");
      else toast.error("Что-то пошло не так");
    },
  });

  return signUpMutation;
};
