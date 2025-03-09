import { Button, Modal, Input, Select } from "shared/ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "entities/user";
import style from "./AddTaskButton.module.scss";
import addFilledIcon from "shared/assets/icons/addFilled.svg";
import { useAddTask } from "../hooks/useAddTask";
import { taskPriorityOptions, taskTypeOptions } from "shared/constants";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

type TForm = {
  title: string;
  description: string;
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
  const [selectedTaskType, setSelectedTaskType] = useState(
    taskTypeOptions[0].value,
  );
  const [selectedTaskPriority, setSelectedTaskPriority] = useState(
    taskPriorityOptions[2].value,
  );
  const user = useAuth();
  const projectId = useCurrentProjectStore((state) => state.currentProjectId);
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
      type: selectedTaskType,
      priority: selectedTaskPriority,
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
            register={register("title", { required: "Введите название" })}
            label={"Название"}
            placeholder={"Название задачи"}
            error={errors.title?.message}
          />
          <Input
            register={register("description")}
            label={"Описание"}
            placeholder={"Описание задачи"}
          />
          <div className={style.selectors_group}>
            <div className={style.selector_container}>
              <span className={style.selector_label}>Тип:</span>
              <Select
                options={taskTypeOptions}
                selected={selectedTaskType}
                onChange={setSelectedTaskType}
              />
            </div>
            <div className={style.selector_container}>
              <span className={style.selector_label}>Приоритет:</span>
              <Select
                options={taskPriorityOptions}
                selected={selectedTaskPriority}
                onChange={setSelectedTaskPriority}
              />
            </div>
          </div>
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
