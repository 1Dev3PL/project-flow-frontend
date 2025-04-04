import style from "./ProjectsPage.module.scss";
import { Page, PageTitle } from "shared/ui";
import addBigIcon from "shared/assets/icons/addBig.svg";
import { useState } from "react";
import { CreateProjectModal } from "features/createProject";
import { useProjects } from "entities/project";
import { CircularProgress } from "@mui/material";
import { DeleteProjectModal } from "features/deleteProject";
import { ProjectCard } from "pages/projects/ui/ProjectCard.tsx";
import { EditProjectModal } from "features/editProject";

export const ProjectsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null,
  );
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const { projects, isFetching } = useProjects();

  const renderProjects = () => {
    return (
      <>
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            onDeleteClick={() => setDeletingProjectId(project.id)}
            onEditClick={() => setEditingProjectId(project.id)}
          />
        ))}
        <div
          className={style.add_project_card}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <img src={addBigIcon} className={style.icon} alt={""} />
          <span>Создать проект</span>
        </div>
      </>
    );
  };

  return (
    <Page>
      <PageTitle>Все проекты</PageTitle>
      <div className={style.content}>
        {isFetching ? (
          <div className={style.loader}>
            <CircularProgress color={"inherit"} />
          </div>
        ) : (
          renderProjects()
        )}
      </div>
      <CreateProjectModal
        open={isCreateModalOpen}
        handleClose={() => setIsCreateModalOpen(false)}
      />
      <DeleteProjectModal
        open={!!deletingProjectId}
        handleClose={() => setDeletingProjectId(null)}
        projectId={deletingProjectId}
      />
      <EditProjectModal
        open={!!editingProjectId}
        handleClose={() => setEditingProjectId(null)}
        projectId={editingProjectId}
      />
    </Page>
  );
};
