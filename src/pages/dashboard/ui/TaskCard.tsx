import React, { useEffect } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import style from "./TaskCard.module.scss";
import { Task } from "shared/types";
import { TaskPriority, TaskType } from "entities/task";
import userIcon from "shared/assets/icons/avatar.svg";

export interface Props {
  dragOverlay?: boolean;
  dragging?: boolean;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  transition?: string | null;
  task: Task;
  onClick?: (e: React.MouseEvent<HTMLLIElement>, taskId: string) => void;
}

export const TaskCard = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        dragOverlay,
        dragging,
        fadeIn,
        listeners,
        sorting,
        transition,
        transform,
        task,
        onClick,
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        onClick?.(e, task.id);
      };

      return (
        <li
          className={classNames(style.wrapper, {
            [style.fade_in]: fadeIn,
            [style.sorting]: sorting,
            [style.drag_overlay]: dragOverlay,
          })}
          style={
            {
              transition: [transition].filter(Boolean).join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
            } as React.CSSProperties
          }
          ref={ref}
          onClick={handleClick}
        >
          <div
            className={classNames(style.task, {
              [style.dragging]: dragging,
              [style.drag_overlay]: dragOverlay,
            })}
            data-cypress="draggable-item"
            {...listeners}
            tabIndex={0}
          >
            <div className={style.task_id}>{task.key}</div>
            <div className={style.task_title} title={task.title}>
              {task.title}
            </div>
            <div className={style.task_created}>
              Создано: {task.createdDate}
            </div>
            <div className={style.task_footer}>
              <div className={style.badges}>
                <TaskType type={task.type} />
                <TaskPriority priority={task.priority} />
              </div>
              {task.executor ? (
                <img
                  className={style.executor_icon}
                  src={userIcon}
                  alt={task.executor.name}
                  title={task.executor.name}
                />
              ) : null}
            </div>
          </div>
        </li>
      );
    },
  ),
);
