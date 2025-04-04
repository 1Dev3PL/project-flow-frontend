import { Input, Modal, Button } from "shared/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./EditProjectModal.module.scss";
import { useEditProject } from "features/editProject/hooks/useEditProject.ts";
import { useProject } from "entities/project";

type TForm = {
  title: string;
  description: string;
  key: string;
};

interface Props {
  open: boolean;
  handleClose: () => void;
  projectId: string | null;
}

export const EditProjectModal = (props: Props) => {
  const { open, handleClose, projectId } = props;
  const { project } = useProject(projectId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>({ values: project });
  const { editProjectMutation, isPending } = useEditProject();

  const handleModalClose = () => {
    reset();
    handleClose();
  };

  const handleEditProject: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const data = {
      projectId: projectId!,
      title: formData.title,
      description: formData.description,
      key: formData.key,
    };

    editProjectMutation(data, { onSettled: handleModalClose });
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      title={"Редактировать проект"}
    >
      <form className={style.form} onSubmit={handleSubmit(handleEditProject)}>
        <Input
          label={"Название проекта"}
          placeholder={"New Project"}
          register={register("title", { required: "Введите название проекта" })}
          error={errors.title?.message}
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
          Сохранить
        </Button>
      </form>
    </Modal>
  );
};
