import {
  Page,
  PageTitle,
  TaskType,
  TaskPriority,
  Select,
  TSelectOption,
} from "shared/ui";
import { AddTaskButton } from "features/addTaskButton";
import style from "./TasksPage.module.scss";
import { ESortBy, ESortOrder, TSortOptions, useTasks } from "entities/task";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { TaskDetails } from "widgets/taskDetails";
import { CircularProgress } from "@mui/material";
import arrowDown from "shared/assets/icons/arrowDown.svg";
import arrowUp from "shared/assets/icons/arrowUp.svg";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

const sortOptions: TSelectOption<TSortOptions>[] = [
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

export const TasksPage = () => {
  const projectId = useCurrentProjectStore((state) => state.currentProjectId);
  const { ref, inView } = useInView();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] =
    useState<TSortOptions | null>(null);
  const { tasks, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTasks(projectId, selectedSortOption);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>, taskId: string) => {
    e.stopPropagation();
    setSelectedTaskId(taskId);
  };

  const handleClose = () => {
    setSelectedTaskId(null);
  };

  const renderTasks = () => {
    return (
      <>
        {tasks?.length ? (
          tasks?.map((task) => (
            <div
              className={style.task}
              key={task.id}
              onClick={(e) => handleOpen(e, task.id)}
            >
              <div>{task.key}</div>
              <div className={style.task_title} title={task.title}>
                {task.title}
              </div>
              {TaskType(task.type)}
              {TaskPriority(task.priority)}
              <div>{task.executorId}</div>
              <div>{task.createdDate}</div>
            </div>
          ))
        ) : (
          <span className={style.no_task}>Нет задач</span>
        )}
        {hasNextPage && (
          <div ref={ref}>
            {isFetchingNextPage && <CircularProgress color={"inherit"} />}
          </div>
        )}
      </>
    );
  };

  return (
    <Page>
      <div className={style.header}>
        <PageTitle>Задачи</PageTitle>
        <AddTaskButton />
      </div>
      <div className={style.list_control}>
        <Select
          options={sortOptions}
          placeholder={"Сортировать по"}
          selected={selectedSortOption}
          onChange={setSelectedSortOption}
        />
      </div>
      <div className={style.table}>
        <div className={style.table_header}>
          <div>ID</div>
          <div>Название</div>
          <div>Тип</div>
          <div>Приоритет</div>
          <div>Исполнитель</div>
          <div>Дата создания</div>
        </div>
        <div className={style.tasks_list}>
          {isLoading ? (
            <div>
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            renderTasks()
          )}
        </div>
      </div>
      <TaskDetails
        taskId={selectedTaskId}
        open={!!selectedTaskId}
        handleClose={handleClose}
      />
    </Page>
  );
};
