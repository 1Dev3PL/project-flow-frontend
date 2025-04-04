import { Project } from "entities/project/api/types.ts";
import { apiInstance } from "shared/api";
import { TCreateProjectRequestData } from "./types.ts";

export const createProject = async (
  projectData: TCreateProjectRequestData,
): Promise<Project> => {
  return await apiInstance
    .post(`/projects`, projectData)
    .then((res) => res.data);
};
