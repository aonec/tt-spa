import { useEvent, useStore } from 'effector-react';
import { TaskGroupingFilter } from 'myApi';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ExportTasksListModalContainer,
  exportTasksListService,
} from '../exportTasksListService';
import { TaskTypesGate } from '../taskTypesService/taskTypesService.model';
import { tasksProfileService } from './tasksProfileService.model';
import { preparedData } from './tasksProfileService.utils';
import { TasksProfile } from './view/TasksProfile';

const { inputs, outputs, gates } = tasksProfileService;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();
  const { TaskGroupTypeGate } = gates;

  const taskTypes = useStore(outputs.$taskTypes);
  const executingTasksCount = useStore(outputs.$executingTasksCount);
  const observingTasksCount = useStore(outputs.$observingTasksCount);
  const isLoading = useStore(outputs.$isLoading);
  const tasks = useStore(outputs.$tasks);
  const preparedTasks = isLoading ? undefined : preparedData(tasks, grouptype);

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.openModal
  );
  const handleSearch = useEvent(inputs.searchTasks);

  return (
    <>
      <TaskGroupTypeGate GroupType={grouptype} />
      <TaskTypesGate />
      <ExportTasksListModalContainer />
      <TasksProfile
        handleExportTasksList={() => handleExportTasksList()}
        grouptype={grouptype}
        handleSearch={handleSearch}
        taskTypes={taskTypes}
        executingTasksCount={executingTasksCount!}
        observingTasksCount={observingTasksCount!}
        tasks={preparedTasks}
      />
    </>
  );
};
