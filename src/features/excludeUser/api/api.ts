import { apiInstance } from "shared/api";

export const excludeUser = async (projectId: string, userId: string) => {
  return await apiInstance
    .delete(`projects/${projectId}/users/${userId}`)
    .then((res) => res.data);
};
