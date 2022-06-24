import { useEvent, useStore } from 'effector-react';
import { TaskGroupingFilter } from 'myApi';
import React, { useEffect, useRef } from 'react';
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
  const { TasksProfileIsOpen } = gates;
  const lastGroupTypeRef = useRef<TaskGroupingFilter | null>(null);

  const taskTypes = useStore(outputs.$taskTypes);
  const executingTasksCount = useStore(outputs.$executingTasksCount);
  const observingTasksCount = useStore(outputs.$observingTasksCount);
  const isLoading = useStore(outputs.$isLoading);

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.openModal
  );
  const handleSearch = useEvent(inputs.searchTasks);
  const changeFiltersByGroupType = useEvent(inputs.changeFiltersByGroupType);
  const changeGroupType = useEvent(inputs.changeGroupType);

  useEffect(() => {
    if (lastGroupTypeRef.current !== grouptype) {
      if (lastGroupTypeRef.current === 'Archived')
        changeFiltersByGroupType(grouptype as TaskGroupingFilter);
      else if (grouptype === 'Archived')
        changeFiltersByGroupType(grouptype as TaskGroupingFilter);
      else changeGroupType(grouptype);

      lastGroupTypeRef.current = grouptype;
    }
  }, [grouptype, lastGroupTypeRef]);

  const initialValues = useStore(outputs.$searchState);
  const tasks = useStore(outputs.$tasks);
  const preparedTasks = isLoading ? undefined : preparedData(tasks, grouptype);

  return (
    <>
      <TasksProfileIsOpen/>
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
        initialValues={initialValues}
      />
    </>
  );
};
