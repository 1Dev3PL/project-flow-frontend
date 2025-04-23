import { useQuery } from "@tanstack/react-query";
import { getUserData } from "entities/user/api/api.ts";
import { User } from "shared/types";

export const useUser = (userId?: string) => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => getUserData(userId!),
    enabled: !!userId,
  });

  return { user, isLoading };
};
