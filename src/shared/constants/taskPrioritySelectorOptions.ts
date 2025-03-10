import { TSelectOption } from "shared/ui";
import { ETaskPriority } from "shared/constants/task.ts";
import priorityCriticalIcon from "shared/assets/icons/taskPriorityIcons/priorityCritical.svg";
import priorityHighIcon from "shared/assets/icons/taskPriorityIcons/priorityHigh.svg";
import priorityMediumIcon from "shared/assets/icons/taskPriorityIcons/priorityMedium.svg";
import priorityLowIcon from "shared/assets/icons/taskPriorityIcons/priorityLow.svg";

export const taskPriorityOptions: TSelectOption<ETaskPriority>[] = [
  {
    title: "Критический",
    value: ETaskPriority.CRITICAL,
    icon: priorityCriticalIcon,
  },
  { title: "Высокий", value: ETaskPriority.HIGH, icon: priorityHighIcon },
  { title: "Средний", value: ETaskPriority.MEDIUM, icon: priorityMediumIcon },
  { title: "Низкий", value: ETaskPriority.LOW, icon: priorityLowIcon },
];
