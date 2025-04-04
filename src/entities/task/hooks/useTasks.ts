import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasks } from "entities/task/api/api.ts";
import { TSortOptions } from "entities/task";

export const useTasks = (
  projectId: string | null,
  sortOptions: TSortOptions | null,
) => {
  const {
    data: tasks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks", projectId, sortOptions],
    queryFn: (meta) =>
      getTasks(projectId!, { page: meta.pageParam }, sortOptions),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    select: (res) => res.pages.flat(),
    enabled: !!projectId
  });

  return {
    tasks,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
