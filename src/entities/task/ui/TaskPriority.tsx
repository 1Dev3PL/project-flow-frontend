import { ETaskPriority } from "entities/task";
import priorityMediumIcon from "shared/assets/icons/taskPriorityIcons/priorityMedium.svg";
import priorityLowIcon from "shared/assets/icons/taskPriorityIcons/priorityLow.svg";
import priorityHighIcon from "shared/assets/icons/taskPriorityIcons/priorityHigh.svg";
import priorityCriticalIcon from "shared/assets/icons/taskPriorityIcons/priorityCritical.svg";
import style from "./TaskPriority.module.scss";

export const TaskPriority = ({ priority }: { priority: ETaskPriority }) => {
  const taskPriority = {
    title: "Средний",
    icon: priorityMediumIcon,
  };

  switch (priority) {
    case ETaskPriority.LOW:
      taskPriority.title = "Низкий";
      taskPriority.icon = priorityLowIcon;
      break;
    case ETaskPriority.MEDIUM:
      taskPriority.title = "Средний";
      taskPriority.icon = priorityMediumIcon;
      break;
    case ETaskPriority.HIGH:
      taskPriority.title = "Высокий";
      taskPriority.icon = priorityHighIcon;
      break;
    case ETaskPriority.CRITICAL:
      taskPriority.title = "Критический";
      taskPriority.icon = priorityCriticalIcon;
      break;
  }

  return (
    <div className={style.task_priority}>
      <img
        src={taskPriority.icon}
        alt={"task-type"}
        className={style.task_priority_img}
        title={taskPriority.title}
      />
    </div>
  );
};
