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
      if (lastPage.pagesCount > lastPageParam) {
        return lastPageParam + 1;
      }
      return null;
    },
    select: (res) => res.pages.flatMap((page) => page.tasks),
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
