import style from "./ProjectsList.module.scss";
import { ProjectCard } from "pages/projects/ui/ProjectCard.tsx";
import addBigIcon from "shared/assets/icons/addBig.svg";
import { useProjects } from "entities/project";
import { CircularProgress } from "@mui/material";

interface Props {
  onCreateProjectClick: () => void;
  onEditProjectClick: (projectId: string) => void;
  onDeleteProjectClick: (projectId: string) => void;
}

export const ProjectsList = (props: Props) => {
  const { onCreateProjectClick, onEditProjectClick, onDeleteProjectClick } =
    props;
  const { projects, isFetching } = useProjects();

  if (isFetching) {
    return (
      <div className={style.loader}>
        <CircularProgress color={"inherit"} />
      </div>
    );
  }

  return (
    <div className={style.projects_list}>
      {projects?.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          onDeleteClick={() => onDeleteProjectClick(project.id)}
          onEditClick={() => onEditProjectClick(project.id)}
        />
      ))}
      <div className={style.add_project_card} onClick={onCreateProjectClick}>
        <img src={addBigIcon} className={style.icon} alt={""} />
        <span>Создать проект</span>
      </div>
    </div>
  );
};
