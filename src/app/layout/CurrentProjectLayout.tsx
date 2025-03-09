import { ReactNode, useEffect } from "react";
import { useParams } from "react-router";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

export const CurrentProjectLayout = ({ children }: { children: ReactNode }) => {
  const { projectId } = useParams();
  const setCurrentProjectId = useCurrentProjectStore(
    (state) => state.setCurrentProjectId,
  );

  useEffect(() => {
    if (projectId) {
      setCurrentProjectId(projectId);
    }
  }, [projectId, setCurrentProjectId]);

  return children;
};
