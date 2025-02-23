import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "entities/user/api/types.ts";
import { getUserData } from "entities/user/api/user.ts";

export const useUser = () => {
  const { data: user } = useSuspenseQuery<User>({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  return user;
};
