import { apiInstance } from "shared/api";
import { SignInData } from "pages/login/api/types.ts";
import { User } from "entities/user";

export const signIn = async (signInData: SignInData): Promise<User> => {
  return await apiInstance.post("/auth/login", signInData).then(res => res.data);
}