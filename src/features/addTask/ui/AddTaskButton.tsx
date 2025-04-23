import { Button, Modal, Input, Select } from "shared/ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "entities/user";
import style from "./AddTaskButton.module.scss";
import addFilledIcon from "shared/assets/icons/addFilled.svg";
import { useAddTask } from "../hooks/useAddTask";
import {
  taskPrioritySelectorOptions,
  taskTypeSelectorOptions,
} from "entities/task";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import { UserSelect } from "features/selectUser";
import { User } from "shared/types";

type TForm = {
  title: string;
  description: string;
};

export const AddTaskButton = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TForm>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const [selectedTaskType, setSelectedTaskType] = useState(
    taskTypeSelectorOptions[0].value,
  );
  const [selectedTaskPriority, setSelectedTaskPriority] = useState(
    taskPrioritySelectorOptions[2].value,
  );
  const [selectedExecutor, setSelectedExecutor] = useState<User | null>(null);
  const user = useAuth();
  const projectId = useCurrentProjectStore((state) => state.currentProjectId);
  const { addTaskMutation, isPending } = useAddTask();

  const handleAddTask: SubmitHandler<TForm> = (formData, event) => {
    event?.preventDefault();

    const data = {
      projectId: projectId!,
      authorId: user.id,
      title: formData.title,
      description: formData.description,
      type: selectedTaskType,
      priority: selectedTaskPriority,
      executorId: selectedExecutor?.id,
    };

    addTaskMutation(data, {
      onSettled: () => {
        reset();
        setSelectedTaskType(taskTypeSelectorOptions[0].value);
        setSelectedTaskPriority(taskPrioritySelectorOptions[2].value);
        setSelectedExecutor(null);
        setOpen(false);
      },
    });
  };

  return (
    <>
      <Button variant={"glass"} onClick={() => setOpen(true)} icon={addFilledIcon}>
        Добавить задачу
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={"Новая задача"}>
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
                options={taskTypeSelectorOptions}
                selected={selectedTaskType}
                onChange={setSelectedTaskType}
              />
            </div>
            <div className={style.selector_container}>
              <span className={style.selector_label}>Приоритет:</span>
              <Select
                options={taskPrioritySelectorOptions}
                selected={selectedTaskPriority}
                onChange={setSelectedTaskPriority}
              />
            </div>
            <div className={style.selector_container}>
              <span className={style.selector_label}>Исполнитель:</span>
              <UserSelect
                selected={selectedExecutor}
                onChange={setSelectedExecutor}
              />
            </div>
          </div>
          <Button type={"submit"} loading={isPending} className={style.button}>
            Создать задачу
          </Button>
        </form>
      </Modal>
    </>
  );
};
