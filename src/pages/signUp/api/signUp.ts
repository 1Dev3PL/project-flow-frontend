import { apiInstance } from "shared/api";
import { SignUpData } from "pages/signUp/api/types.ts";
import { User } from "shared/types";

export const signUp = async (signupData: SignUpData): Promise<User> => {
  return await apiInstance.post("/auth/register", signupData).then(res => res.data);
};