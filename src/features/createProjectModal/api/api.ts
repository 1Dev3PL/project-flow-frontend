import { Project } from "entities/project/api/types.ts";
import { apiInstance } from "shared/api";
import { TNewProjectData } from "./types.ts";

export const createProject = async (
  projectData: TNewProjectData,
  userId: string,
): Promise<Project> => {
  return await apiInstance
    .post(`/projects?userId=${userId}`, projectData)
    .then((res) => res.data);
};
