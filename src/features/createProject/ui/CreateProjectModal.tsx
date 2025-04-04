import { Input, Modal, Button } from "shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./CreateProjectModal.module.scss";
import { useCreateProject } from "../hooks/useCreateProject.ts";

type TForm = {
  title: string;
  description: string;
  key: string;
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const CreateProjectModal = (props: Props) => {
  const { open, handleClose } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const { createProjectMutation, isPending } = useCreateProject();

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  const handleCreateProject: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const data = {
      title: formData.title || "New Project",
      description: formData.description,
      key: formData.key,
    };

    createProjectMutation(data, { onSettled: handleModalClose });
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      title={"Создать новый проект"}
    >
      <form className={style.form} onSubmit={handleSubmit(handleCreateProject)}>
        <Input
          label={"Название проекта"}
          placeholder={"New Project"}
          register={register("title")}
        />
        <Input
          label={"Описание проекта"}
          placeholder={"Введите описание проекта"}
          register={register("description")}
        />
        <Input
          label={"Ключ"}
          register={register("key", {
            maxLength: {
              value: 10,
              message: "Ключ не может быть длиннее 10 символов",
            },
          })}
          error={errors.key?.message}
        />
        <Button type={"submit"} loading={isPending} className={style.button}>
          Создать проект
        </Button>
      </form>
    </Modal>
  );
};
