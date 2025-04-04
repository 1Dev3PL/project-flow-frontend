import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteProject } from "features/deleteProject/api/api.ts";
import toast from "react-hot-toast";
import { Project } from "entities/project";

type TDeleteProjectData = {
  projectId: string;
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

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

      toast.success(`Проект удален`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { deleteProjectMutation, isPending };
};
