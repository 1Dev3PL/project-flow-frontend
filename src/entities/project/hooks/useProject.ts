import { useQuery } from "@tanstack/react-query";
import { Project } from "entities/project";
import { getProject } from "entities/project/api/api.ts";

export const useProject = (projectId?: string | null) => {
  const { data: project, isFetching } = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId!),
    enabled: !!projectId,
  });

  return { project, isFetching };
};
