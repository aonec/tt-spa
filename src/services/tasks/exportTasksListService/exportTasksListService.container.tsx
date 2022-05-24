import { useStore } from 'effector-react';
import React from 'react';
import { exportTasksListService } from './exportTasksListService.models';

export const ExportTasksListContainer = () => {
  const isModalOpen = useStore(exportTasksListService.outputs.$isModalOpen);

  return <></>;
};
