import { apiInstance } from "shared/api";
import { User, ProjectUser, EUserRole } from "entities/user/api/types.ts";

export const getAuthData = async (): Promise<User> => {
  return await apiInstance.get("/auth/data").then((res) => res.data);
};

export const getUserData = async (userId: string): Promise<User> => {
  return await apiInstance.get(`/users/${userId}`).then((res) => res.data);
};

export const getProjectUsers = async (
  projectId: string,
  { page }: { page: number },
): Promise<ProjectUser[]> => {
  return await apiInstance
    .get(`/projects/${projectId}/users?page=${page}`)
    .then((res) => res.data);
};

export const getRole = async (projectId: string): Promise<EUserRole> => {
  return await apiInstance
    .get(`/users/me/role?projectId=${projectId}`)
    .then((res) => res.data);
};
