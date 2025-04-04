import { useQuery } from "@tanstack/react-query";
import { getRole } from "entities/user/api/api.ts";
import { EUserRole } from "entities/user/api/types.ts";

export const useRole = (projectId: string | null) => {
  const { data: role, isLoading } = useQuery<EUserRole>({
    queryKey: ["role", projectId],
    queryFn: () => getRole(projectId!),
    enabled: !!projectId
  });

  return { role, isLoading };
};
