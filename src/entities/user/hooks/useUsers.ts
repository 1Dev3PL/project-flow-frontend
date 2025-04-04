import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjectUsers } from "entities/user/api/api.ts";

export const useUsers = (projectId: string | null) => {
  const {
    data: users,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", projectId],
    queryFn: (meta) => getProjectUsers(projectId!, { page: meta.pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (res) => res.pages.flat(),
    enabled: !!projectId,
  });

  return {
    users,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
