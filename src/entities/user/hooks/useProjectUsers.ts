import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjectUsers } from "entities/user/api/api.ts";

export const useProjectUsers = (projectId: string | null) => {
  const {
    data: projectUsers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["project-users", projectId],
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
    projectUsers,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
