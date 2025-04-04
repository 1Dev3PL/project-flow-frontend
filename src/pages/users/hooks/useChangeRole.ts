import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EUserRole, ProjectUser } from "entities/user";
import { IMessageResponse } from "shared/api";
import { AxiosError } from "axios";
import { changeRole } from "pages/users/api/api.ts";

type TChangeRoleData = {
  projectId: string;
  userId: string;
  roleData: { role: EUserRole };
};

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  const { mutate: changeRoleMutation, isPending } = useMutation<
    IMessageResponse,
    AxiosError,
    TChangeRoleData,
    { previousUsers?: InfiniteData<ProjectUser[]> }
  >({
    mutationFn: ({ projectId, userId, roleData }) =>
      changeRole(projectId, userId, roleData),
    onMutate: async ({ projectId, userId, roleData }) => {
      await queryClient.cancelQueries({
        queryKey: ["users", projectId],
      });

      const previousUsers: InfiniteData<ProjectUser[]> | undefined =
        queryClient.getQueryData(["users", projectId]);

      queryClient.setQueryData(
        ["users", projectId],
        (oldUsers: InfiniteData<ProjectUser[]> | undefined) => {
          return {
            pageParams: oldUsers?.pageParams,
            pages: oldUsers?.pages.map((page) =>
              page.map((user) =>
                user.id == userId ? { ...user, role: roleData.role } : user,
              ),
            ),
          };
        },
      );

      return { previousUsers };
    },
    onSettled: (_, __, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["users", projectId] });
    },
    onSuccess: () => {
      toast.success(`Роль изменена`);
    },
    onError: (_, { projectId }, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users", projectId], context.previousUsers);
      }
      toast.error(`Что-то пошло не так`);
    },
  });

  return { changeRoleMutation, isPending };
};
