import { TSelectOption } from "shared/ui";
import typeTaskIcon from "shared/assets/icons/taskTypeIcons/typeTask.svg";
import typeBugIcon from "shared/assets/icons/taskTypeIcons/typeBug.svg";
import typeStoryIcon from "shared/assets/icons/taskTypeIcons/typeStory.svg";
import typeEpicIcon from "shared/assets/icons/taskTypeIcons/typeEpic.svg";
import { ETaskType } from "shared/types";

export const taskTypeSelectorOptions: TSelectOption<ETaskType>[] = [
  { title: "Задача", value: ETaskType.TASK, icon: typeTaskIcon },
  { title: "Баг", value: ETaskType.BUG, icon: typeBugIcon },
  { title: "История", value: ETaskType.STORY, icon: typeStoryIcon },
  { title: "Эпик", value: ETaskType.EPIC, icon: typeEpicIcon },
];
