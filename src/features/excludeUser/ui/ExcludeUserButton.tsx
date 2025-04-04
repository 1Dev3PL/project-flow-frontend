import { useState } from "react";
import style from "./ExcludeUserButton.module.scss";
import { Button, Modal } from "shared/ui";
import { useExcludeUser } from "features/excludeUser/hooks/useExcludeUser.ts";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

interface Props {
  userId: string;
}

export const ExcludeUserButton = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { excludeUserMutation, isPending } = useExcludeUser();
  const projectId = useCurrentProjectStore((state) => state.currentProjectId)!;

  const handleClose = () => {
    setOpen(false);
  };

  const handleExcludeUser = () => {
    excludeUserMutation(
      { projectId, userId: props.userId },
      { onSettled: handleClose },
    );
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={style.exclude_button}
        variant={"danger"}
      >
        Исключить
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        title={"Исключить пользователя?"}
      >
        <div className={style.buttons_container}>
          <Button
            onClick={handleExcludeUser}
            loading={isPending}
            variant={"danger"}
          >
            Да
          </Button>
          <Button onClick={handleClose}>Нет</Button>
        </div>
      </Modal>
    </>
  );
};
