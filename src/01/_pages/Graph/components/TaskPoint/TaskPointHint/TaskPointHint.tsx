import React, { FC } from 'react';
import { TaskInfoItem } from './TaskPointHint.styled';
import { TaskPointHintProps } from './TaskPointHint.types';

export const TaskPointHint: FC<TaskPointHintProps> = ({ task }) => {
  if (!task.title) {
    return null;
  }

  return (
    <TaskInfoItem key={task.id}>
      <span>{task.title}</span>
    </TaskInfoItem>
  );
};
