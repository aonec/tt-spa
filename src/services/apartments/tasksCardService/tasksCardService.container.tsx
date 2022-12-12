import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { tasksCardService } from './tasksCardService.model';
import { TasksCardContainerProps } from './tasksCardService.types';
import { TasksCard } from './view/TasksCard';

const { outputs } = tasksCardService;

export const TasksCardContainer: FC<TasksCardContainerProps> = ({
  apartmentId,
  tasksNumber,
}) => {
  const isAdministrator = useStore(outputs.$isAdministrator);

  return (
    <TasksCard
      id={apartmentId}
      tasksNumber={tasksNumber}
      isAdministrator={isAdministrator}
      type="apartment"
    />
  );
};
