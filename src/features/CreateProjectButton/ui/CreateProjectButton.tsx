import { useState } from "react";
import { Input } from "shared/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "shared/ui/modal";
import style from "./CreateProjectButton.module.scss";
import { Button } from "shared/ui/button";
import {
  CreateProjectData,
  useCreateProject,
} from "features/createProjectButton/hooks/useCreateProject.ts";
import { useUser } from "entities/user";
import createIcon from "shared/assets/icons/add.svg";

type TForm = {
  title: string;
  description: string;
  key: string;
};

export const CreateProjectButton = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<TForm>();
  const createProject = useCreateProject();
  const { user } = useUser();
  // TODO - Auto Key generation
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleCreateProject: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const data: CreateProjectData = {
      userId: user!.id,
      title: formData.title || "New Project",
      description: formData.description,
      key: formData.key,
    };

    createProject(data, { onSettled: handleClose });
  };

  return (
    <>
      <button onClick={handleOpen} className={style.open_button}>
        <img className={style.icon} src={createIcon} alt={""} />
        Создать проект
      </button>
      <Modal open={open} onClose={handleClose} title={"Создать новый проект"}>
        <form
          className={style.form}
          onSubmit={handleSubmit(handleCreateProject)}
        >
          <Input
            label={"Название проекта"}
            placeholder={"New Project"}
            {...register("title")}
          />
          <Input
            label={"Описание проекта"}
            placeholder={"Введите описание проекта"}
            {...register("description")}
          />
          <Input label={"Ключ"} placeholder={""} {...register("key")} />
          <div className={style.button_container}>
            <Button type={"submit"}>Создать проект</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
