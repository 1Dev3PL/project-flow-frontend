import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "entities/user/api/types.ts";
import { getAuthData } from "entities/user/api/api.ts";

export const useAuth = () => {
  const { data: user } = useSuspenseQuery<User>({
    queryKey: ["auth"],
    queryFn: getAuthData,
  });

  return user;
};
