import typeTaskIcon from "shared/assets/icons/taskTypeIcons/typeTask.svg";
import typeEpicIcon from "shared/assets/icons/taskTypeIcons/typeEpic.svg";
import typeBugIcon from "shared/assets/icons/taskTypeIcons/typeBug.svg";
import typeStoryIcon from "shared/assets/icons/taskTypeIcons/typeStory.svg";
import typeSubtaskIcon from "shared/assets/icons/taskTypeIcons/typeSubtask.svg";
import style from "./TaskType.module.scss";
import { ETaskType } from "shared/types";

export const TaskType = ({ type }: { type: ETaskType }) => {
  const taskType = {
    title: "Задача",
    icon: typeTaskIcon,
  };

  switch (type) {
    case ETaskType.EPIC:
      taskType.title = "Эпик";
      taskType.icon = typeEpicIcon;
      break;
    case ETaskType.BUG:
      taskType.title = "Баг";
      taskType.icon = typeBugIcon;
      break;
    case ETaskType.TASK:
      taskType.title = "Задача";
      taskType.icon = typeTaskIcon;
      break;
    case ETaskType.STORY:
      taskType.title = "История";
      taskType.icon = typeStoryIcon;
      break;
    case ETaskType.SUBTASK:
      taskType.title = "Подзадача";
      taskType.icon = typeSubtaskIcon;
      break;
  }

  return (
    <div className={style.task_type}>
      <img
        src={taskType.icon}
        alt={"task-type"}
        className={style.task_type_img}
        title={taskType.title}
      />
    </div>
  );
};
