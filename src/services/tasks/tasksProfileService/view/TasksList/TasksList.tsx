import React, { FC } from 'react';
import { TasksListItem } from '../TasksListItem';
import { TasksListProps } from './TasksList.types';

export const TasksList: FC<TasksListProps> = ({
  tasks,
  toggleTaskCheckbox,
  selectedTasks,
  isControlMode,
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <TasksListItem
          key={task.id}
          task={task}
          isSelected={selectedTasks?.includes(task.id)}
          toggleTaskCheckbox={
            toggleTaskCheckbox && (() => toggleTaskCheckbox(task.id))
          }
          isControlMode={isControlMode}
        />
      ))}
    </div>
  );
};
