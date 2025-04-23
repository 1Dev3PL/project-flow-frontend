import { TSelectOption } from "shared/ui";
import { ETaskStatus } from "shared/types";

export const taskStatusSelectorOptions: TSelectOption<ETaskStatus>[] = [
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
