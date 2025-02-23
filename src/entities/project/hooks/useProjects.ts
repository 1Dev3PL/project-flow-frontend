import { useQuery } from "@tanstack/react-query";
import { Project } from "entities/project";
import { getProjects } from "entities/project/api/api.ts";

export const useProjects = (userId: number) => {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  return { projects, isLoading };
};
