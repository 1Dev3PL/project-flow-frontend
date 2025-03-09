import { useQuery } from "@tanstack/react-query";
import { User } from "entities/user/api/types.ts";
import { getUserData } from "entities/user/api/api.ts";

export const useUser = (userId?: string) => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => getUserData(userId!),
    enabled: !!userId,
  });

  return { user, isLoading };
};
