import { useEvent } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ExportTasksListModalContainer,
  exportTasksListService,
} from '../exportTasksListService';
import { tasksProfileService } from './tasksProfileService.models';
import { TasksProfile } from './view/TasksProfile';

const { inputs, outputs, gates } = tasksProfileService;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: string }>();
  const { TaskGroupTypeGate } = gates;

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.openModal
  );

  const handleSearch = useEvent(inputs.searchTasks);

  return (
    <>
      <ExportTasksListModalContainer />
      <TaskGroupTypeGate grouptype={grouptype} />
      <TasksProfile
        handleExportTasksList={handleExportTasksList}
        grouptype={grouptype}
        handleSearch={handleSearch}
      />
    </>
  );
};
