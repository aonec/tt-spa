import { TaskGroupingFilter } from 'myApi';
import React, { FC } from 'react';
import { MoreWrapper, TasksNumberWrapper, Wrapper } from './TasksCard.styled';
import { TasksCardProps } from './TasksCard.types';

export const TasksCard: FC<TasksCardProps> = ({
  id,
  tasksNumber,
  isAdministrator,
  type
}) => {
  const isTasksExist = Boolean(tasksNumber);

  const groupType = isAdministrator
    ? TaskGroupingFilter.Observing
    : TaskGroupingFilter.Executing;

  const queryId = type === 'apartment'
    ? `apartmentId=${id}`
    : `housingStockId=${id}`;

  return (
    <Wrapper>
      <TasksNumberWrapper>Задачи: {tasksNumber}</TasksNumberWrapper>
      {isTasksExist && (
        <MoreWrapper
          to={`/tasks/list/${groupType}?${queryId}`}
          target="_blank"
        >
          {'Перейти >'}
        </MoreWrapper>
      )}
    </Wrapper>
  );
};
