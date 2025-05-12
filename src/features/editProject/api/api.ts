import { apiInstance } from "shared/api";
import { TEditProjectRequestData } from "features/editProject/api/types.ts";
import { Project } from "shared/types";

export const editProject = async (
  projectId: string,
  projectData: TEditProjectRequestData,
): Promise<Project> => {
  return await apiInstance
    .put(`/projects/${projectId}`, projectData)
    .then((res) => res.data);
};
