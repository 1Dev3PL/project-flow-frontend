import { Drawer } from "@mui/material";
import { useTask } from "entities/task";

interface Props {
  taskId: string | null;
  open: boolean;
  handleClose: () => void;
}

export const TaskDetails = (props: Props) => {
  const { taskId, open, handleClose } = props;
  const { task } = useTask(taskId);

  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      {task?.title}
    </Drawer>
  );
};
