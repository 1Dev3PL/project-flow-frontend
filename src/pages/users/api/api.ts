import { apiInstance, IMessageResponse } from "shared/api";
import { EUserRole } from "entities/user";

export const changeRole = async (
  projectId: string,
  userId: string,
  roleData: {
    role: EUserRole;
  },
): Promise<IMessageResponse> => {
  return await apiInstance
    .post(`/projects/${projectId}/users/${userId}/role`, roleData)
    .then((res) => res.data);
};
