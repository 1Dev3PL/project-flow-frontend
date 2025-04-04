import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import { useProject } from "entities/project";
import { Link } from "react-router";
import style from "./CurrentProjectInfo.module.scss";
import { Skeleton } from "shared/ui";

export const CurrentProjectInfo = () => {
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );
  const { project, isFetching } = useProject(currentProjectId);

  return (
    <>
      {currentProjectId && (
        <Link className={style.container} to={`/projects/${currentProjectId}`}>
          <div className={style.image_container}>
            {isFetching ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <img alt={""} />
            )}
          </div>
          <div className={style.info}>
            <div className={style.label}>Проект</div>
            <div className={style.project_title} title={project?.title}>
              {isFetching ? (
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
              ) : (
                project?.title
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
