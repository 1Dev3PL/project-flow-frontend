import { TSelectOption } from "shared/ui";
import { ETaskStatus } from "shared/constants/task.ts";

export const taskStatusOptions: TSelectOption<ETaskStatus>[] = [
  {
    title: "Открыто",
    value: ETaskStatus.OPEN,
  },
  {
    title: "В работе",
    value: ETaskStatus.IN_PROGRESS,
  },
  {
    title: "Ревью",
    value: ETaskStatus.REVIEW,
  },
  {
    title: "Выполнено",
    value: ETaskStatus.COMPLETE,
  },
];
