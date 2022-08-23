import React, { FC } from 'react';
import { TasksCardContainerProps } from './tasksCardService.types';
import { TasksCard } from './view/TasksCard';

export const TasksCardContainer: FC<TasksCardContainerProps> = ({
  apartmentId,
  tasksNumber,
}) => {
  return (
    <>
      <TasksCard apartmentId={apartmentId} tasksNumber={tasksNumber} />
    </>
  );
};
