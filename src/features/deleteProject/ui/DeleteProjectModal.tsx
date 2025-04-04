import { Button, Modal } from "shared/ui";
import style from "features/deleteProject/ui/DeleteProjectModal.module.scss";
import { useDeleteProject } from "features/deleteProject/hooks/useDeleteProject.ts";

interface Props {
  open: boolean;
  handleClose: () => void;
  projectId: string | null;
}

export const DeleteProjectModal = (props: Props) => {
  const { open, handleClose, projectId } = props;
  const { deleteProjectMutation, isPending } = useDeleteProject();

  const handleDeleteProject = () => {
    deleteProjectMutation(
      { projectId: projectId! },
      { onSettled: handleClose },
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={"Вы точно хотите удалить проект?"}
    >
      <div className={style.buttons_container}>
        <Button
          onClick={handleDeleteProject}
          loading={isPending}
          variant={"danger"}
        >
          Да
        </Button>
        <Button onClick={handleClose}>Нет</Button>
      </div>
    </Modal>
  );
};
