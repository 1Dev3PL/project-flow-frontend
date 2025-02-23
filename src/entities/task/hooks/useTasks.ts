import { useInfiniteQuery } from "@tanstack/react-query";
import { getTasks } from "entities/task/api/api.ts";

export const useTasks = (projectId: number) => {
  const {
    data: tasks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks", projectId],
    queryFn: (meta) => getTasks(projectId, { page: meta.pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.pagesCount > lastPageParam) {
        return lastPageParam + 1;
      }
      return null;
    },
    select: (res) => res.pages.flatMap((page) => page.tasks),
  });

  return {
    tasks,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
