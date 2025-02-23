import { ETaskType } from "shared/constants/task.ts";
import typeTaskIcon from "shared/assets/icons/taskTypeIcons/typeTask.svg";
import typeEpicIcon from "shared/assets/icons/taskTypeIcons/typeEpic.svg";
import typeBugIcon from "shared/assets/icons/taskTypeIcons/typeBug.svg";
import typeStoryIcon from "shared/assets/icons/taskTypeIcons/typeStory.svg";
import typeSubtaskIcon from "shared/assets/icons/taskTypeIcons/typeSubtask.svg";
import style from "./TaskType.module.scss";

export const TaskType = (taskType: ETaskType) => {
  const type = {
    title: "Задача",
    icon: typeTaskIcon,
  };

  switch (taskType) {
    case ETaskType.EPIC:
      type.title = "Эпик";
      type.icon = typeEpicIcon;
      break;
    case ETaskType.BUG:
      type.title = "Баг";
      type.icon = typeBugIcon;
      break;
    case ETaskType.TASK:
      type.title = "Задача";
      type.icon = typeTaskIcon;
      break;
    case ETaskType.STORY:
      type.title = "История";
      type.icon = typeStoryIcon;
      break;
    case ETaskType.SUBTASK:
      type.title = "Подзадача";
      type.icon = typeSubtaskIcon;
      break;
  }

  return (
    <div className={style.task_type}>
      <img
        src={type.icon}
        alt={"task-type"}
        className={style.task_type_img}
        title={type.title}
      />
    </div>
  );
};
