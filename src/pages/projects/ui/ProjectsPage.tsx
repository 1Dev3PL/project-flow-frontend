import { Page, PageTitle } from "shared/ui";
import { useState } from "react";
import { CreateProjectModal } from "features/createProject";
import { DeleteProjectModal } from "features/deleteProject";
import { EditProjectModal } from "features/editProject";
import { ProjectsList } from "pages/projects/ui/ProjectsList.tsx";

export const ProjectsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null,
  );
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const handleCreateProjectClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditProjectClick = (projectId: string) => {
    setEditingProjectId(projectId);
  };

  const handleDeleteProjectClick = (projectId: string) => {
    setDeletingProjectId(projectId);
  };

  return (
    <Page>
      <PageTitle>Все проекты</PageTitle>
      <ProjectsList
        onCreateProjectClick={handleCreateProjectClick}
        onEditProjectClick={handleEditProjectClick}
        onDeleteProjectClick={handleDeleteProjectClick}
      />
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
