import { Page } from "shared/ui/page";
import { PageTitle } from "shared/ui/pageTitle";
import { AddTaskButton } from "features/addTaskButton";
import style from "./TasksPage.module.scss";
import { useTasks } from "entities/task";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TaskDetails } from "widgets/taskDetails";
import { TaskType } from "shared/ui/taskType";
import { TaskPriority } from "shared/ui/taskPriority";
import { CircularProgress } from "@mui/material";

export const TasksPage = () => {
  const { projectId } = useParams();
  const { tasks, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTasks(projectId!);
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleOpen = (taskId: string) => {
    setSelectedTaskId(taskId);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTaskId(null);
    setOpen(false);
  };

  const renderTasks = () => {
    return (
      <>
        {tasks?.length ? (
          tasks?.map((task) => (
            <div
              className={style.task}
              key={task.id}
              onClick={() => handleOpen(task.id)}
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
        open={open}
        handleClose={handleClose}
      />
    </Page>
  );
};
