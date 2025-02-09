import { ProjectData } from "features/createProjectButton/api/types.ts";
import { apiInstance } from "shared/api";
import { Project } from "entities/project";

export const createProject = async (projectData: ProjectData, userId: number): Promise<Project> => {
  return await apiInstance.post(`/projects?userId=${userId}`, projectData).then(res => res.data);
}