import { useEvent } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ExportTasksListModalContainer,
  exportTasksListService,
} from '../exportTasksListService';
import { TasksProfile } from './view/TasksProfile';

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: string }>();

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.openModal
  );

  return (
    <>
      <ExportTasksListModalContainer />
      <TasksProfile
        handleExportTasksList={handleExportTasksList}
        grouptype={grouptype}
      />
    </>
  );
};
