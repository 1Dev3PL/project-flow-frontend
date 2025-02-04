import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "entities/user/api/types.ts";
import { getUserData } from "entities/user/api/user.ts";

export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isError,
    isLoading,
    isFetching,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: () => getUserData(),
    refetchOnMount: () => !queryClient.getQueryData(["user"]),
  });

  return {
    user: user || null,
    isError,
    isLoading,
    isFetching,
  };
};
