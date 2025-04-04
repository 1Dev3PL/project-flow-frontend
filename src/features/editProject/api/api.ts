import { apiInstance } from "shared/api";
import { Project } from "entities/project";
import { TEditProjectRequestData } from "features/editProject/api/types.ts";

export const editProject = async (
  projectId: string,
  projectData: TEditProjectRequestData,
): Promise<Project> => {
  return await apiInstance
    .put(`/projects/${projectId}`, projectData)
    .then((res) => res.data);
};
