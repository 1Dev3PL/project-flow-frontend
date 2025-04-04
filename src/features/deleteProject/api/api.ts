import { apiInstance } from "shared/api";

export const deleteProject = async (projectId: string) => {
  return await apiInstance
    .delete(`/projects/${projectId}`)
    .then((res) => res.data);
};
