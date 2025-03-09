import { apiInstance } from "shared/api";
import { User } from "entities/user/api/types.ts";

export const getAuthData = async (): Promise<User> => {
  return await apiInstance.get("/auth/data").then((res) => res.data);
};

export const getUserData = async (userId: string): Promise<User> => {
  return await apiInstance.get(`/users/${userId}`).then((res) => res.data);
};
