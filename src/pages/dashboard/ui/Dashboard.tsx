import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  closestCenter,
  CollisionDetection,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { coordinateGetter as multipleContainersCoordinateGetter } from "../utils/multipleContainersKeyboardCoordinates.ts";
import { SortableTask } from "./SortableTask.tsx";
import { TaskCard } from "./TaskCard.tsx";
import { Container } from "./Container.tsx";
import { ETaskStatus, Task } from "shared/types";
import {
  TDashboardTasks,
  useDashboardTasks,
} from "pages/dashboard/hooks/useDashboardTasks.ts";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import { CircularProgress } from "@mui/material";
import { taskStatusNames, useUpdateTask } from "entities/task";
import { TaskDetails } from "widgets/taskDetails";
import style from "./Dashboard.module.scss";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export function Dashboard() {
  const projectId = useCurrentProjectStore((state) => state.currentProjectId);
  const { dashboardTasks, isLoading } = useDashboardTasks(projectId);
  const { updateTaskMutation } = useUpdateTask();
  const [tasks, setTasks] = useState<TDashboardTasks>({
    [ETaskStatus.OPEN]: [],
    [ETaskStatus.IN_PROGRESS]: [],
    [ETaskStatus.REVIEW]: [],
    [ETaskStatus.TESTING]: [],
    [ETaskStatus.COMPLETE]: [],
  });
  const containers = useMemo(
    () => Object.keys(ETaskStatus) as ETaskStatus[],
    [],
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const [draggableTaskData, setDraggableTaskData] = useState<Task | null>(null);
  const [clonedTasks, setClonedTasks] = useState<TDashboardTasks | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: multipleContainersCoordinateGetter,
    }),
  );

  useEffect(() => {
    if (dashboardTasks) {
      setTasks(dashboardTasks);
    }
  }, [dashboardTasks]);

  /**
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in tasks) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in tasks,
          ),
        });
      }

      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in tasks) {
          const containerItems = tasks[overId];

          // If a container is matched, and it contains items
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  !!containerItems.find((task) => task.id == container.id),
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, tasks],
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in tasks) {
      return id;
    }

    return Object.keys(tasks).find(
      (key) => !!tasks[key].find((task) => task.id == id),
    );
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
    setDraggableTaskData(active.data.current?.task);
    setClonedTasks(tasks);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setTasks((tasks) => {
        const activeItems = tasks[activeContainer];
        const overItems = tasks[overContainer];
        const overIndex = overItems.findIndex((task) => task.id == overId);
        const activeIndex = activeItems.findIndex(
          (task) => task.id == active.id,
        );

        let newIndex: number;

        if (overId in tasks) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        return {
          ...tasks,
          [activeContainer]: tasks[activeContainer].filter(
            (task) => task.id !== active.id,
          ),
          [overContainer]: [
            ...tasks[overContainer].slice(0, newIndex),
            tasks[activeContainer][activeIndex],
            ...tasks[overContainer].slice(
              newIndex,
              tasks[overContainer].length,
            ),
          ],
        };
      });
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      setDraggableTaskData(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      setDraggableTaskData(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      if (draggableTaskData!.status != overContainer) {
        updateTaskMutation({
          taskId: String(active.id),
          status: overContainer as ETaskStatus,
        });
      }

      const activeIndex = tasks[activeContainer].findIndex(
        (task) => task.id == active.id,
      );
      const overIndex = tasks[overContainer].findIndex(
        (task) => task.id == overId,
      );

      if (activeIndex !== overIndex) {
        setTasks((tasks) => ({
          ...tasks,
          [overContainer]: arrayMove(
            tasks[overContainer],
            activeIndex,
            overIndex,
          ),
        }));
      }
    }

    setActiveId(null);
    setDraggableTaskData(null);
  };

  const onDragCancel = () => {
    if (clonedTasks) {
      setTasks(clonedTasks);
    }

    setActiveId(null);
    setClonedTasks(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [tasks]);

  const renderDraggableTaskOverlay = () => {
    return <TaskCard task={draggableTaskData!} dragOverlay />;
  };

  const handleTaskClick = (
    e: React.MouseEvent<HTMLLIElement>,
    taskId: string,
  ) => {
    e.stopPropagation();
    setSelectedTaskId(taskId);
  };

  if (isLoading) {
    return (
      <div className={style.loader}>
        <CircularProgress color={"inherit"} />
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div className={style.dashboard}>
          {containers.map((containerId) => (
            <Container
              id={containerId}
              key={containerId}
              label={taskStatusNames[containerId]}
              isEmpty={tasks[containerId].length == 0}
            >
              <SortableContext
                items={tasks[containerId]}
                strategy={verticalListSortingStrategy}
              >
                {tasks[containerId].map((task) => {
                  return (
                    <SortableTask
                      key={task.id}
                      task={task}
                      onClick={handleTaskClick}
                    />
                  );
                })}
              </SortableContext>
            </Container>
          ))}
        </div>
        {createPortal(
          <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
            {activeId ? renderDraggableTaskOverlay() : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
      <TaskDetails
        taskId={selectedTaskId}
        open={!!selectedTaskId}
        handleClose={() => setSelectedTaskId(null)}
      />
    </>
  );
}
