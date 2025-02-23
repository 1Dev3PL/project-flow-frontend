import { ETaskPriority } from "shared/constants/task.ts";
import priorityMediumIcon from "shared/assets/icons/taskPriorityIcons/priorityMedium.svg";
import priorityLowIcon from "shared/assets/icons/taskPriorityIcons/priorityLow.svg";
import priorityHighIcon from "shared/assets/icons/taskPriorityIcons/priorityHigh.svg";
import priorityCriticalIcon from "shared/assets/icons/taskPriorityIcons/priorityCritical.svg";
import style from "./TaskPriority.module.scss";

export const TaskPriority = (taskPriority: ETaskPriority) => {
  const priority = {
    title: "Средний",
    icon: priorityMediumIcon,
  };

  switch (taskPriority) {
    case ETaskPriority.LOW:
      priority.title = "Низкий";
      priority.icon = priorityLowIcon;
      break;
    case ETaskPriority.MEDIUM:
      priority.title = "Средний";
      priority.icon = priorityMediumIcon;
      break;
    case ETaskPriority.HIGH:
      priority.title = "Высокий";
      priority.icon = priorityHighIcon;
      break;
    case ETaskPriority.CRITICAL:
      priority.title = "Критический";
      priority.icon = priorityCriticalIcon;
      break;
  }

  return (
    <div className={style.task_priority}>
      <img
        src={priority.icon}
        alt={"task-type"}
        className={style.task_priority_img}
        title={priority.title}
      />
    </div>
  );
};
