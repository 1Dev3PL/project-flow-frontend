import { TSelectOption } from "shared/ui";
import { ETaskType } from "shared/constants/task.ts";
import typeTaskIcon from "shared/assets/icons/taskTypeIcons/typeTask.svg";
import typeBugIcon from "shared/assets/icons/taskTypeIcons/typeBug.svg";
import typeStoryIcon from "shared/assets/icons/taskTypeIcons/typeStory.svg";
import typeEpicIcon from "shared/assets/icons/taskTypeIcons/typeEpic.svg";

export const taskTypeOptions: TSelectOption<ETaskType>[] = [
  { title: "Задача", value: ETaskType.TASK, icon: typeTaskIcon },
  { title: "Баг", value: ETaskType.BUG, icon: typeBugIcon },
  { title: "История", value: ETaskType.STORY, icon: typeStoryIcon },
  { title: "Эпик", value: ETaskType.EPIC, icon: typeEpicIcon },
];
