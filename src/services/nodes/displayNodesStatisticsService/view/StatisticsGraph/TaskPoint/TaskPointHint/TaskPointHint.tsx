import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { ChevronIconCS, TaskInfoItem } from './TaskPointHint.styled';
import { TaskPointHintProps } from './TaskPointHint.types';

export const TaskPointHint: FC<TaskPointHintProps> = ({ task }) => {
  const navigate = useNavigate();
  if (!task.title) {
    return null;
  }

  return (
    <TaskInfoItem key={task.id}>
      <span>{task.title}</span>
      <div>
        <ChevronIconCS onClick={() => navigate(`/tasks/profile/${task.id}`)} />
      </div>
    </TaskInfoItem>
  );
};
