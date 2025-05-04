import { TSelectOption } from "shared/ui";
import { ETaskPriority, ETaskStatus, ETaskType } from "shared/types";
import priorityCriticalIcon from "shared/assets/icons/taskPriorityIcons/priorityCritical.svg";
import priorityHighIcon from "shared/assets/icons/taskPriorityIcons/priorityHigh.svg";
import priorityMediumIcon from "shared/assets/icons/taskPriorityIcons/priorityMedium.svg";
import priorityLowIcon from "shared/assets/icons/taskPriorityIcons/priorityLow.svg";
import typeTaskIcon from "shared/assets/icons/taskTypeIcons/typeTask.svg";
import typeBugIcon from "shared/assets/icons/taskTypeIcons/typeBug.svg";
import typeStoryIcon from "shared/assets/icons/taskTypeIcons/typeStory.svg";
import typeEpicIcon from "shared/assets/icons/taskTypeIcons/typeEpic.svg";

export const taskStatusNames = {
  [ETaskStatus.OPEN]: "Открыто",
  [ETaskStatus.IN_PROGRESS]: "В работе",
  [ETaskStatus.REVIEW]: "Ревью",
  [ETaskStatus.TESTING]: "Тестируется",
  [ETaskStatus.COMPLETE]: "Выполнено",
};

export const taskPrioritySelectorOptions: TSelectOption<ETaskPriority>[] = [
  {
    title: "Критический",
    value: ETaskPriority.CRITICAL,
    icon: priorityCriticalIcon,
  },
  { title: "Высокий", value: ETaskPriority.HIGH, icon: priorityHighIcon },
  { title: "Средний", value: ETaskPriority.MEDIUM, icon: priorityMediumIcon },
  { title: "Низкий", value: ETaskPriority.LOW, icon: priorityLowIcon },
];

export const taskStatusSelectorOptions: TSelectOption<ETaskStatus>[] = [
  {
    title: taskStatusNames[ETaskStatus.OPEN],
    value: ETaskStatus.OPEN,
  },
  {
    title: taskStatusNames[ETaskStatus.IN_PROGRESS],
    value: ETaskStatus.IN_PROGRESS,
  },
  {
    title: taskStatusNames[ETaskStatus.REVIEW],
    value: ETaskStatus.REVIEW,
  },
  {
    title: taskStatusNames[ETaskStatus.TESTING],
    value: ETaskStatus.TESTING,
  },
  {
    title: taskStatusNames[ETaskStatus.COMPLETE],
    value: ETaskStatus.COMPLETE,
  },
];

export const taskTypeSelectorOptions: TSelectOption<ETaskType>[] = [
  { title: "Задача", value: ETaskType.TASK, icon: typeTaskIcon },
  { title: "Баг", value: ETaskType.BUG, icon: typeBugIcon },
  { title: "История", value: ETaskType.STORY, icon: typeStoryIcon },
  { title: "Эпик", value: ETaskType.EPIC, icon: typeEpicIcon },
];
