import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { createProject } from "../api/api.ts";
import { TCreateProjectRequestData } from "features/createProject/api/types.ts";
import { Project } from "shared/types";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: createProjectMutation, isPending } = useMutation<
    Project,
    AxiosError,
    TCreateProjectRequestData
  >({
    mutationFn: (projectData) => createProject(projectData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onSuccess: (data) => {
      toast.success(`Проект ${data.title} создан`);
    },
    onError: () => {
      toast.error(`Что-то пошло не так`);
    },
  });

  return { createProjectMutation, isPending };
};
