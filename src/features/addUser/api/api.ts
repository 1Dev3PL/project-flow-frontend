import { apiInstance, IMessageResponse } from "shared/api";
import { TAddUserRequestData } from "features/addUser/api/types.ts";

export const addUser = async (
  projectId: string,
  userData: TAddUserRequestData,
): Promise<IMessageResponse> => {
  return await apiInstance
    .post(`/projects/${projectId}/users`, userData)
    .then((res) => res.data);
};
