import { Page, PageTitle, Select } from "shared/ui";
import { AddTaskButton } from "features/addTask";
import style from "./TasksPage.module.scss";
import { TSortOptions } from "entities/task";
import React, { useState } from "react";
import { TaskDetails } from "widgets/taskDetails";
import { TasksList } from "pages/tasks/ui/TasksList.tsx";
import { tasksSortOptions } from "pages/tasks/constants/constants.ts";

export const TasksPage = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] =
    useState<TSortOptions | null>(null);

  const handleTaskClick = (
    e: React.MouseEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.stopPropagation();
    setSelectedTaskId(taskId);
  };

  const handleClose = () => {
    setSelectedTaskId(null);
  };

  return (
    <Page>
      <div className={style.header}>
        <PageTitle>Задачи</PageTitle>
        <AddTaskButton />
      </div>
      <div className={style.list_control}>
        <Select
          options={tasksSortOptions}
          placeholder={"Сортировать по"}
          selected={selectedSortOption}
          onChange={setSelectedSortOption}
        />
      </div>
      <div className={style.table}>
        <div className={style.table_header}>
          <div>ID</div>
          <div>Название</div>
          <div>Статус</div>
          <div>Тип</div>
          <div>Приоритет</div>
          <div>Исполнитель</div>
          <div>Дата создания</div>
        </div>
        <TasksList
          sortOption={selectedSortOption}
          onTaskClick={handleTaskClick}
        />
      </div>
      <TaskDetails
        taskId={selectedTaskId}
        open={!!selectedTaskId}
        handleClose={handleClose}
      />
    </Page>
  );
};
