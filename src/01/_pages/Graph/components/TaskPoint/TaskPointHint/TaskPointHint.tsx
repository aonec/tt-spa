import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { ChevronIconCS, TaskInfoItem } from './TaskPointHint.styled';
import { TaskPointHintProps } from './TaskPointHint.types';

export const TaskPointHint: FC<TaskPointHintProps> = ({ task }) => {
  const history = useHistory();
  if (!task.title) {
    return null;
  }

  return (
    <TaskInfoItem key={task.id}>
      <span>{task.title}</span>
      <div>
        <ChevronIconCS
          onClick={() => history.push(`/tasks/profile/${task.id}`)}
        />
      </div>
    </TaskInfoItem>
  );
};
