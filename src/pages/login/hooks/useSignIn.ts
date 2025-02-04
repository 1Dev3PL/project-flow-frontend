import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInData } from "pages/login/api/types.ts";
import { signIn } from "pages/login/api/signIn.ts";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInMutation } = useMutation({
    mutationFn: (signInData: SignInData) => signIn(signInData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data)
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return signInMutation;
}