import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { TaskCard } from "./TaskCard.tsx";
import { Task } from "shared/types";
import { useMountStatus } from "pages/dashboard/hooks/useMountStatus.ts";

interface SortableItemProps {
  task: Task;
  onClick?: (e: React.MouseEvent<HTMLLIElement>, taskId: string) => void;
}

export const SortableTask = ({ task, onClick }: SortableItemProps) => {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      task,
    },
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <TaskCard
      ref={setNodeRef}
      task={task}
      dragging={isDragging}
      sorting={isSorting}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      onClick={onClick}
    />
  );
};
