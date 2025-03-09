import { apiInstance } from "shared/api";
import { Project } from "entities/project";

export const getProjects = async (userId: string): Promise<Project[]> => {
  return await apiInstance
    .get(`/projects?userId=${userId}`)
    .then((res) => res.data);
};

export const getProject = async (projectId: string): Promise<Project> => {
  return await apiInstance
    .get(`/projects/${projectId}`)
    .then((res) => res.data);
};
