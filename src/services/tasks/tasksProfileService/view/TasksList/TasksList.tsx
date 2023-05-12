import React, { FC } from 'react';
import { TasksListItem } from '../TasksListItem';
import { TasksListProps } from './TasksList.types';

export const TasksList: FC<TasksListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TasksListItem key={task.id} task={task} />
      ))}
    </div>
  );
};
