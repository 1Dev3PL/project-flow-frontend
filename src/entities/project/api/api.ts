import { apiInstance } from "shared/api";
import { Project } from "shared/types";

export const getProjects = async (): Promise<Project[]> => {
  return await apiInstance.get(`/projects`).then((res) => res.data);
};

export const getProject = async (projectId: string): Promise<Project> => {
  return await apiInstance
    .get(`/projects/${projectId}`)
    .then((res) => res.data);
};
