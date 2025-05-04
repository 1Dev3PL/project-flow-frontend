import style from "./DeleteTaskModal.module.scss";
import { Button, Modal } from "shared/ui";
import { useDeleteTask } from "features/deleteTask/hooks/useDeleteTask.ts";

interface Props {
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  taskId: string | null;
}

export const DeleteTaskModal = (props: Props) => {
  const { open, handleClose, taskId, onDelete } = props;
  const { deleteTaskMutation, isPending } = useDeleteTask();

  const handleDeleteTask = () => {
    deleteTaskMutation(
      { taskId: taskId! },
      {
        onSettled: () => {
          handleClose();
          onDelete();
        },
      },
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      title={"Вы точно хотите удалить задачу?"}
    >
      <div className={style.buttons_container}>
        <Button
          onClick={handleDeleteTask}
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
