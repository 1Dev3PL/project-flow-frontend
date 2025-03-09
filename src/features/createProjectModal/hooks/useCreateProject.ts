import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Project } from "entities/project";
import { AxiosError } from "axios";
import { createProject } from "../api/api.ts";
import { TNewProjectData } from "features/createProjectModal/api/types.ts";

type TCreateProjectData = {
  userId: string;
} & TNewProjectData

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: createProjectMutation, isPending } = useMutation<
    Project,
    AxiosError,
    TCreateProjectData
  >({
    mutationFn: ({ userId, ...projectData }) =>
      createProject(projectData, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(`Проект ${data.title} создан`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { createProjectMutation, isPending };
};
