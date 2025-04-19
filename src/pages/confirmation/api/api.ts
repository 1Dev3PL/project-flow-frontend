import { apiInstance } from "shared/api";

export const confirmAccount = async (token: string) => {
  return await apiInstance
    .get(`/auth/confirmation?token=${token}`)
    .then((res) => res.data);
};
