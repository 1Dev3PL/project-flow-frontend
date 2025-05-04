import { TSelectOption } from "shared/ui";
import { ESortBy, ESortOrder, TSortOptions } from "entities/task";
import arrowUp from "shared/assets/icons/arrowUp.svg";
import arrowDown from "shared/assets/icons/arrowDown.svg";

export const tasksSortOptions: TSelectOption<TSortOptions>[] = [
  { title: "Название", value: [ESortOrder.ASC, ESortBy.TITLE], icon: arrowUp },
  {
    title: "Название",
    value: [ESortOrder.DESC, ESortBy.TITLE],
    icon: arrowDown,
  },
  {
    title: "Дата создания",
    value: [ESortOrder.ASC, ESortBy.CREATED_DATE],
    icon: arrowUp,
  },
  {
    title: "Дата создания",
    value: [ESortOrder.DESC, ESortBy.CREATED_DATE],
    icon: arrowDown,
  },
  {
    title: "Без сортировки",
    value: null,
  },
];
