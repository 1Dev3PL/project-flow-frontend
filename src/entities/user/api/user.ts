import { apiInstance } from "shared/api";
import { User } from "entities/user/api/types.ts";

export const getUserData = async (): Promise<User> => {
  return await apiInstance.get("/auth/data").then(res => res.data)
}