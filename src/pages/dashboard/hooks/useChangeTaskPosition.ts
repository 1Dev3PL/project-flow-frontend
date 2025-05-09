import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeTaskPosition } from "pages/dashboard/api/api.ts";
import { AxiosError } from "axios";
import { TTaskPositionRequestData } from "pages/dashboard/api/types.ts";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

export const useChangeTaskPosition = () => {
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );
  const queryClient = useQueryClient();

  const { mutate: changeTaskPositionMutation, isPending } = useMutation<
    void,
    AxiosError,
    TTaskPositionRequestData
  >({
    mutationFn: changeTaskPosition,
    onSettled: (_, __, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tasks", currentProjectId] });
    },
  });

  return { changeTaskPositionMutation, isPending };
};
