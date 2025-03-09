import { useTask, useUpdateTask } from "entities/task";
import { Drawer, Input, Select } from "shared/ui";
import style from "./taskDetails.module.scss";
import {
  ETaskPriority,
  ETaskStatus,
  ETaskType,
  taskPriorityOptions,
  taskStatusOptions,
  taskTypeOptions,
} from "shared/constants";
import { useUser } from "entities/user";
import { useEffect, useRef, useState } from "react";
import { useProject } from "entities/project";

interface Props {
  taskId: string | null;
  open: boolean;
  handleClose: () => void;
}

export const TaskDetails = (props: Props) => {
  const { taskId, open, handleClose } = props;
  const { task, isLoading } = useTask(taskId);
  const { user: author } = useUser(task?.authorId);
  const { project } = useProject(task?.projectId);
  const { updateTaskMutation } = useUpdateTask();

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
                {project?.title}
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Автор</span>
                {author?.name}
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Тип</span>
                <Select
                  options={taskTypeOptions}
                  selected={task?.type}
                  onChange={handleTypeChange}
                />
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Приоритет</span>
                <Select
                  options={taskPriorityOptions}
                  selected={task?.priority}
                  onChange={handlePriorityChange}
                />
              </div>
              <div className={style.details_row}>
                <span className={style.row_title}>Статус</span>
                <Select
                  options={taskStatusOptions}
                  selected={task?.status}
                  onChange={handleStatusChange}
                />
              </div>
              <Input
                label={"Описание"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleDescriptionUpdate}
              />
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};
