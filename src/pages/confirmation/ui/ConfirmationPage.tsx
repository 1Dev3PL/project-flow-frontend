import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useConfirmation } from "pages/confirmation/hooks/useConfirmation.ts";

export const ConfirmationPage = () => {
  const {isLoading, isError} = useConfirmation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        toast.error("Ошибка подтверждения аккаунта");
      } else {
        toast.success("Аккаунт подтвержден");
      }
      navigate("/login");
    }
  }, [isError, isLoading, navigate]);

  return <></>;
};
