import style from "./TasksList.module.scss";
import {
  TaskPriority,
  taskStatusNames,
  TaskType,
  TSortOptions,
  useTasks,
} from "entities/task";
import userIcon from "shared/assets/icons/avatar.svg";
import { CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";
import React from "react";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

interface Props {
  onTaskClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    taskId: string,
  ) => void;
  sortOption: TSortOptions | null;
}

export const TasksList = (props: Props) => {
  const { onTaskClick, sortOption } = props;
  const projectId = useCurrentProjectStore((state) => state.currentProjectId);
  const { tasks, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTasks(projectId, sortOption);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  if (isLoading) {
    return (
      <div className={style.loader}>
        <CircularProgress color={"inherit"} />
      </div>
    );
  }

  return (
    <div className={style.tasks_list}>
      {tasks?.length ? (
        tasks?.map((task) => (
          <div
            className={style.task}
            key={task.id}
            onClick={(e) => onTaskClick(e, task.id)}
          >
            <div>{task.key}</div>
            <div className={style.task_title} title={task.title}>
              {task.title}
            </div>
            <div>{taskStatusNames[task.status]}</div>
            <TaskType type={task.type} />
            <TaskPriority priority={task.priority} />
            <div className={style.author_block}>
              {task.executor && (
                <img className={style.author_avatar} src={userIcon} alt={""} />
              )}
              {task.executor?.name}
            </div>
            <div>{task.createdDate}</div>
          </div>
        ))
      ) : (
        <span className={style.no_task}>Нет задач</span>
      )}
      <div ref={ref} style={{ minHeight: "1px" }}>
        {isFetchingNextPage && <CircularProgress color={"inherit"} />}
      </div>
    </div>
  );
};
