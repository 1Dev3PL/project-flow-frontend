import { useQuery } from "@tanstack/react-query";
import { User } from "entities/user/api/types.ts";
import { getUserData } from "entities/user/api/user.ts";

export const useUser = () => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });

  return {
    user: user || null,
    isError,
    isLoading
  };
};
