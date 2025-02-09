import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "features/createProjectButton/api/createProject.ts";
import toast from "react-hot-toast";
import { Project } from "entities/project";
import { AxiosError } from "axios";

export interface CreateProjectData {
  userId: number;
  title: string;
  description: string;
  key: string;
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: createProjectMutation } = useMutation<
    Project,
    AxiosError,
    CreateProjectData
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

  return createProjectMutation;
};
