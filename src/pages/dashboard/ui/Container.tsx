import React from "react";
import style from "./Container.module.scss";
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface Props {
  id: UniqueIdentifier;
  children: React.ReactNode;
  label: string;
  isEmpty: boolean;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export function Container({ children, label, id, isEmpty }: Props) {
  const { setNodeRef } = useSortable({
    id,
    data: {
      type: "container",
      isEmpty,
    },
    animateLayoutChanges,
  });

  return (
    <div className={style.container} ref={setNodeRef}>
      <div className={style.container_header}>{label}</div>
      <div className={style.tasks_list_wrapper}>
        <ul className={style.tasks_list}>{children}</ul>
      </div>
    </div>
  );
}
