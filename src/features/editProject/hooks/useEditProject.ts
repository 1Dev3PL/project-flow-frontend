import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProject } from "features/editProject/api/api.ts";
import { AxiosError } from "axios";
import { TEditProjectRequestData } from "features/editProject/api/types.ts";
import toast from "react-hot-toast";
import { Project } from "shared/types";

type TEditProjectData = {
  projectId: string;
} & TEditProjectRequestData;

export const useEditProject = () => {
  const queryClient = useQueryClient();

  const { mutate: editProjectMutation, isPending } = useMutation<
    Project,
    AxiosError,
    TEditProjectData
  >({
    mutationFn: ({ projectId, ...projectData }) =>
      editProject(projectId, projectData),
    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
    onSuccess: () => {
      toast.success("Изменения сохранены");
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { editProjectMutation, isPending };
};
