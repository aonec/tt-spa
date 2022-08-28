import { TaskGroupingFilter } from 'myApi';
import React, { FC } from 'react';
import { MoreWrapper, TasksNumberWrapper, Wrapper } from './TasksCard.styled';
import { TasksCardProps } from './TasksCard.types';

export const TasksCard: FC<TasksCardProps> = ({
  apartmentId,
  tasksNumber,
  isAdministrator,
}) => {
  const isTasksExist = Boolean(tasksNumber);
  const grouptype = isAdministrator
    ? TaskGroupingFilter.Observing
    : TaskGroupingFilter.Executing;

  return (
    <Wrapper>
      <TasksNumberWrapper>Задачи: {tasksNumber}</TasksNumberWrapper>
      {isTasksExist && (
        <MoreWrapper
          to={`/tasks/list/${grouptype}?apartmentId=${apartmentId}`}
          target="_blank"
        >
          {'Перейти >'}
        </MoreWrapper>
      )}
    </Wrapper>
  );
};
