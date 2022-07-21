import React, { useEffect, useMemo, useRef } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { TaskGroupingFilter, TaskListResponse } from 'myApi';
import {
  ExportTasksListModalContainer,
  exportTasksListService,
} from '../exportTasksListService';
import { TaskTypesGate } from '../taskTypesService/taskTypesService.model';
import { tasksProfileService } from './tasksProfileService.model';
import { preparedData } from './tasksProfileService.utils';
import { TasksProfile } from './view/TasksProfile';

const { inputs, outputs } = tasksProfileService;
const { ExportTaskFiltersGate } = exportTasksListService.gates;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();
  const lastGroupTypeRef = useRef<TaskGroupingFilter | null>(null);

  const taskTypes = useStore(outputs.$taskTypes);
  const housingManagments = useStore(outputs.$housingManagments);
  const perpetrators = useStore(outputs.$perpetratorIdStore);
  const pagedTasks = useStore(outputs.$tasksPagedData);
  const isLoading = useStore(outputs.$isLoading);
  const isExtendedSearchOpen = useStore(outputs.$isExtendedSearchOpen);

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.openModal
  );
  const handleSearch = useEvent(inputs.searchTasks);
  const changeFiltersByGroupType = useEvent(inputs.changeFiltersByGroupType);
  const changeGroupType = useEvent(inputs.changeGroupType);
  const changePageNumber = useEvent(inputs.changePageNumber);
  const closeExtendedSearch = useEvent(inputs.extendedSearchClosed);
  const openExtendedSearch = useEvent(inputs.extendedSearchOpened);
  const clearFilters = useEvent(inputs.clearFilters);

  useEffect(() => {
    closeExtendedSearch();

    if (lastGroupTypeRef.current === grouptype) {
      return;
    }
    const isFromArchive = lastGroupTypeRef.current === 'Archived';
    const isToArchive = grouptype === 'Archived' && lastGroupTypeRef.current;
    if (isFromArchive || isToArchive) {
      changeFiltersByGroupType(grouptype as TaskGroupingFilter);
    } else {
      changeGroupType(grouptype);
    }

    lastGroupTypeRef.current = grouptype;
  }, [grouptype, lastGroupTypeRef]);

  const initialValues = useStore(outputs.$searchState);
  const preparedTasks = useMemo(
    () => preparedData(pagedTasks?.items || [], grouptype),
    [pagedTasks?.items]
  );

  return (
    <>
      <TaskTypesGate />
      <ExportTaskFiltersGate />
      <ExportTasksListModalContainer />
      <TasksProfile
        handleExportTasksList={() => handleExportTasksList()}
        grouptype={grouptype}
        handleSearch={handleSearch}
        changePageNumber={changePageNumber}
        taskTypes={taskTypes}
        tasks={preparedTasks as TaskListResponse[]}
        initialValues={initialValues}
        pagedTasks={pagedTasks}
        isLoading={isLoading}
        isExtendedSearchOpen={isExtendedSearchOpen}
        closeExtendedSearch={() => closeExtendedSearch()}
        openExtendedSearch={() => openExtendedSearch()}
        clearFilters={() => clearFilters()}
        changeFiltersByGroupType={changeFiltersByGroupType}
        housingManagments={housingManagments}
        perpetrators={perpetrators}
      />
    </>
  );
};
