import { apiInstance } from "shared/api";

export const deleteTask = async (taskId: string): Promise<void> => {
  return await apiInstance.delete(`/tasks/${taskId}`).then((res) => res.data);
};
