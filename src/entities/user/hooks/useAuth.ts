import { useSuspenseQuery } from "@tanstack/react-query";
import { getAuthData } from "entities/user/api/api.ts";
import { User } from "shared/types";

export const useAuth = () => {
  const { data: user } = useSuspenseQuery<User>({
    queryKey: ["auth"],
    queryFn: getAuthData,
    refetchOnMount: false,
  });

  return user;
};
