import {
  taskPrioritySelectorOptions,
  taskStatusSelectorOptions,
  taskTypeSelectorOptions,
  useTask,
  useUpdateTask,
} from "entities/task";
import { Drawer, IconButton, Input, Select, TextArea } from "shared/ui";
import style from "./TaskDetails.module.scss";
import { useEffect, useRef, useState } from "react";
import { ETaskPriority, ETaskStatus, ETaskType, User } from "shared/types";
import { UserSelect } from "features/selectUser";
import userIcon from "shared/assets/icons/avatar.svg";
import closeIcon from "shared/assets/icons/close.svg";
import deleteIcon from "shared/assets/icons/delete.svg";
import { DeleteTaskModal } from "features/deleteTask";

interface Props {
  taskId: string | null;
  open: boolean;
  handleClose: () => void;
}

export const TaskDetails = (props: Props) => {
  const { taskId, open, handleClose } = props;
  const { task, isLoading } = useTask(taskId);
  const { updateTaskMutation } = useUpdateTask();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState<string>("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    if (isTitleEdit) {
      titleRef.current?.focus();
    }
  }, [isTitleEdit]);

  const handleTitleUpdate = () => {
    if (!title) {
      setTitleError("Введите название задачи");
      return;
    }

    setTitleError("");
    setIsTitleEdit(false);
    if (task!.title == title) return;

    updateTaskMutation({
      taskId: task!.id,
      title,
    });
  };

  const handleDescriptionUpdate = () => {
    if (task!.description == description) return;

    updateTaskMutation({
      taskId: task!.id,
      description,
    });
  };

  const handleExecutorChange = (executor: User | null) => {
    updateTaskMutation({
      taskId: task!.id,
      executor: executor,
    });
  };

  const handleTypeChange = (type: ETaskType) => {
    if (task!.type == type) return;

    updateTaskMutation({
      taskId: task!.id,
      type,
    });
  };

  const handlePriorityChange = (priority: ETaskPriority) => {
    if (task!.priority == priority) return;

    updateTaskMutation({
      taskId: task!.id,
      priority,
    });
  };

  const handleStatusChange = (status: ETaskStatus) => {
    if (task!.status == status) return;

    updateTaskMutation({
      taskId: task!.id,
      status,
    });
  };

  const onClose = () => {
    setIsTitleEdit(false);
    setTitleError("");
    handleClose();
  };

  const renderTitle = () => {
    return isTitleEdit ? (
      <Input
        className={style.task_title}
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleTitleUpdate}
        error={titleError}
      />
    ) : (
      <h2
        className={style.task_title}
        title={task?.title}
        onClick={(e) => {
          e.stopPropagation();
          setIsTitleEdit(true);
        }}
      >
        {task?.title}
      </h2>
    );
  };

  return (
    <Drawer id="task-details-drawer-container" open={open} onClose={onClose}>
      <div className={style.header}>
        <IconButton
          icon={deleteIcon}
          alt={"delete"}
          onClick={() => setIsDeleteModalOpen(true)}
        />
        <IconButton icon={closeIcon} alt={"close"} onClick={onClose} />
      </div>
      <div className={style.content}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={style.task_key}>{task?.key}</div>
            {renderTitle()}
            <div className={style.task_details}>
              <div className={style.details_row}>
                <span className={style.row_title}>Проект</span>
                {task?.project.title}
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Автор</span>
                <div className={style.author_block}>
                  <img
                    className={style.author_avatar}
                    src={userIcon}
                    alt={""}
                  />
                  {task?.author.name}
                </div>
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Исполнитель</span>
                <UserSelect
                  selected={task?.executor}
                  onChange={handleExecutorChange}
                />
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Тип</span>
                <Select
                  options={taskTypeSelectorOptions}
                  selected={task?.type}
                  onChange={handleTypeChange}
                />
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Приоритет</span>
                <Select
                  options={taskPrioritySelectorOptions}
                  selected={task?.priority}
                  onChange={handlePriorityChange}
                />
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Статус</span>
                <Select
                  options={taskStatusSelectorOptions}
                  selected={task?.status}
                  onChange={handleStatusChange}
                />
              </div>
              <TextArea
                label={"Описание"}
                placeholder={"Введите описание задачи"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleDescriptionUpdate}
              />
            </div>
          </>
        )}
      </div>
      <DeleteTaskModal
        open={isDeleteModalOpen}
        handleClose={() => {
          setIsDeleteModalOpen(false);
        }}
        onDelete={handleClose}
        taskId={task?.id || null}
      />
    </Drawer>
  );
};
