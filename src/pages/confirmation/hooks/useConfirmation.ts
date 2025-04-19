import { useQuery } from "@tanstack/react-query";
import { confirmAccount } from "pages/confirmation/api/api.ts";
import { useSearchParams } from "react-router";

export const useConfirmation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isLoading, isError } = useQuery({
    queryKey: ["confirmation", token],
    queryFn: () => confirmAccount(token!),
    enabled: !!token,
    gcTime: 0,
  });

  return { isLoading, isError };
};
