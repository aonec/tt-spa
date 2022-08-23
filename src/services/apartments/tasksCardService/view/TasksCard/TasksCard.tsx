import React, { FC } from 'react';
import { MoreWrapper, TasksNumberWrapper, Wrapper } from './TasksCard.styled';
import { TasksCardProps } from './TasksCard.types';

export const TasksCard: FC<TasksCardProps> = ({ apartmentId, tasksNumber }) => {
  return (
    <Wrapper>
      <TasksNumberWrapper>Задачи: {tasksNumber}</TasksNumberWrapper>
      <MoreWrapper
        to={`/tasks/list/Executing?apartmentId=${apartmentId}`}
        target="_blank"
      >
        {'Перейти >'}
      </MoreWrapper>
    </Wrapper>
  );
};
