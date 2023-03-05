import React, { FC } from 'react';
import { Wrapper } from './TaskInfoPanel.styled';
import { TaskInfoPanelProps } from './TaskInfoPanel.types';

export const TaskInfoPanel: FC<TaskInfoPanelProps> = ({ task }) => {
  return <Wrapper>{task.id}</Wrapper>;
};
