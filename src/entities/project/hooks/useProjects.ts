import { useQuery } from "@tanstack/react-query";
import { Project } from "entities/project";
import { getProjects } from "entities/project/api/api.ts";

export const useProjects = (userId: string) => {
  const { data: projects, isFetching } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  return { projects, isFetching };
};
