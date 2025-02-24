import { Button } from "shared/ui/button";
import { useState } from "react";
import { Modal } from "shared/ui/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "entities/user";
import { Input } from "shared/ui/input";
import { useParams } from "react-router";
import style from "./AddTaskButton.module.scss";
import addFilledIcon from "shared/assets/icons/addFilled.svg";
import { useAddTask } from "features/addTaskButton/hooks/useAddTask.ts";
import { ETaskPriority, ETaskType } from "shared/constants/task.ts";

type TForm = {
  title: string;
  description: string;
  type: ETaskType;
  priority: ETaskPriority;
  executorId: string;
};

export const AddTaskButton = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>();
  const user = useUser();
  const { projectId } = useParams();
  const { addTaskMutation, isPending } = useAddTask();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleAddTask: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const data = {
      projectId: projectId!,
      authorId: user.id,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      priority: formData.priority,
      executorId: formData.executorId,
    };

    addTaskMutation(data, { onSettled: handleClose });
  };

  return (
    <>
      <Button variant={"glass"} onClick={handleOpen} icon={addFilledIcon}>
        Добавить задачу
      </Button>
      <Modal open={open} onClose={handleClose} title={"Новая задача"}>
        <form className={style.form} onSubmit={handleSubmit(handleAddTask)}>
          <Input
            {...register("title", { required: "Введите название" })}
            label={"Название"}
            placeholder={"Название задачи"}
            error={errors.title?.message}
          />
          <Input
            {...register("description")}
            label={"Описание"}
            placeholder={"Описание задачи"}
          />
          <select {...register("type")} defaultValue={ETaskType.TASK}>
            <option value={ETaskType.TASK}>Задача</option>
            <option value={ETaskType.BUG}>Баг</option>
            <option value={ETaskType.STORY}>История</option>
            <option value={ETaskType.EPIC}>Эпик</option>
          </select>
          <select {...register("priority")} defaultValue={ETaskPriority.MEDIUM}>
            <option value={ETaskPriority.CRITICAL}>Критический</option>
            <option value={ETaskPriority.HIGH}>Высокий</option>
            <option value={ETaskPriority.MEDIUM}>Средний</option>
            <option value={ETaskPriority.LOW}>Низкий</option>
          </select>
          <div className={style.button_container}>
            <Button type={"submit"} loading={isPending}>
              Создать задачу
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
