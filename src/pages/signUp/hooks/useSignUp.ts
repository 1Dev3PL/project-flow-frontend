import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "pages/signUp/api/signUp.ts";
import { SignUpData } from "pages/signUp/api/types.ts";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signUpMutation } = useMutation({
    mutationFn: (signUpData: SignUpData) => signUp(signUpData),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data)
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return signUpMutation;
};
