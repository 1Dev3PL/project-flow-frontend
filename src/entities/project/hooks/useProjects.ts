import { useQuery } from "@tanstack/react-query";
import { getProjects } from "entities/project/api/api.ts";
import { Project } from "shared/types";

export const useProjects = () => {
  const { data: projects, isFetching } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  return { projects, isFetching };
};
