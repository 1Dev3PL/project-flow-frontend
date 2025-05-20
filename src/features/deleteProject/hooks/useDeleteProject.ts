import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteProject } from "features/deleteProject/api/api.ts";
import toast from "react-hot-toast";
import { Project } from "shared/types";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

type TDeleteProjectData = {
  projectId: string;
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );
  const removeCurrentProjectId = useCurrentProjectStore(
    (state) => state.removeCurrentProjectId,
  );

  const { mutate: deleteProjectMutation, isPending } = useMutation<
    void,
    AxiosError,
    TDeleteProjectData
  >({
    mutationFn: ({ projectId }) => deleteProject(projectId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
    onSuccess: (_, { projectId }) => {
      queryClient.setQueryData(
        ["projects"],
        (projects: Project[] | undefined) =>
          projects?.filter((project) => project.id !== projectId),
      );
      if (currentProjectId == projectId) {
        removeCurrentProjectId();
      }

      toast.success(`Проект удален`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { deleteProjectMutation, isPending };
};
