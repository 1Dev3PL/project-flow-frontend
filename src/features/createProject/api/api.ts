import { apiInstance } from "shared/api";
import { TCreateProjectRequestData } from "./types.ts";
import { Project } from "shared/types";

export const createProject = async (
  projectData: TCreateProjectRequestData,
): Promise<Project> => {
  return await apiInstance
    .post(`/projects`, projectData)
    .then((res) => res.data);
};
