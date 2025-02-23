import { Project } from "entities/project/api/types.ts";
import { apiInstance } from "shared/api";
import { CreateProjectData } from "features/createProjectModal/api/types.ts";

export const createProject = async (
  projectData: CreateProjectData,
  userId: number,
): Promise<Project> => {
  return await apiInstance
    .post(`/projects?userId=${userId}`, projectData)
    .then((res) => res.data);
};
