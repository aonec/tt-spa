import React, { useEffect, useMemo, useRef } from 'react';
import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import {
  ESecuredIdentityRoleName,
  ETaskEngineeringElement,
  TaskGroupingFilter,
} from 'api/types';
import { tasksProfileService } from './tasksProfileService.model';
import { getAddressObject, prepareData } from './tasksProfileService.utils';
import { TaskType } from './view/TasksListItem/TasksListItem.types';
import { TasksProfile } from './view/TasksProfile';
import queryString from 'query-string';
import { TaskTypesGate } from '../taskTypesService/taskTypesService.model';
import {
  AddTaskFromDispatcherContainer,
  addTaskFromDispatcherService,
} from '../addTaskFromDispatcherService';
import { usePermission } from 'hooks/usePermission';
import { exportTasksListService } from '../exportTasksListService';
import { CloseTasksContainer } from './closeTasks';
import { closeTasksService } from './closeTasks/closeTasksService.models';
import { ReassignTasksContainer } from './reassignTasks';
import { reassignTasksService } from './reassignTasks/reassignTasksService.models';

const { inputs, outputs, gates } = tasksProfileService;
const { InitialGate } = gates;
const { AddTaskDataFetchGate } = addTaskFromDispatcherService.gates;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{
    grouptype: TaskGroupingFilter;
  }>() as { grouptype: TaskGroupingFilter };

  const {
    taskTypes,
    housingManagments,
    perpetrators,
    pagedTasks,
    isLoading,
    isExtendedSearchOpen,
    apartment,
    housingStock,
    initialValues,
    tasksPageSegment,
    handleExportTasksList,
    handleSearch,
    changeFiltersByGroupType,
    changeGroupType,
    changePageNumber,
    closeExtendedSearch,
    openExtendedSearch,
    clearFilters,
    clearAddress,
    setTasksPageSegment,
    handleOpenAddTaskModal,
    tasksSummaryData,
    selectedTasks,
    toggleTaskCheckbox,
    setSelectedTasks,
    handleCloseTasks,
    handleReassignTasks,
  } = useUnit({
    taskTypes: outputs.$taskTypes,
    housingManagments: outputs.$housingManagments,
    perpetrators: outputs.$organizationUsers,
    pagedTasks: outputs.$tasksPagedData,
    isLoading: outputs.$isLoading,
    isExtendedSearchOpen: outputs.$isExtendedSearchOpen,
    apartment: outputs.$apartment,
    housingStock: outputs.$housingStock,
    initialValues: outputs.$searchState,
    tasksPageSegment: outputs.$tasksPageSegment,
    handleExportTasksList: exportTasksListService.inputs.exportTasksList,
    handleSearch: inputs.searchTasks,
    changeFiltersByGroupType: inputs.changeFiltersByGroupType,
    changeGroupType: inputs.changeGroupType,
    changePageNumber: inputs.changePageNumber,
    closeExtendedSearch: inputs.extendedSearchClosed,
    openExtendedSearch: inputs.extendedSearchOpened,
    clearFilters: inputs.clearFilters,
    clearAddress: inputs.clearAddress,
    setTasksPageSegment: inputs.setTasksPageSegment,
    handleOpenAddTaskModal: inputs.handleOpenAddTaskModal,
    tasksSummaryData: outputs.$tasksSummaryData,
    selectedTasks: outputs.$selectedTasks,
    toggleTaskCheckbox: inputs.toggleTaskCheckbox,
    setSelectedTasks: inputs.setSelectedTasks,
    handleCloseTasks: closeTasksService.inputs.openModal,
    handleReassignTasks: reassignTasksService.inputs.openModal,
  });

  const isAllowControlMode = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.SeniorOperator,
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  ]);

  const isControlMode = useMemo(() => {
    return (
      (grouptype === TaskGroupingFilter.Observing ||
        grouptype === TaskGroupingFilter.Executing) &&
      isAllowControlMode
    );
  }, [grouptype, isAllowControlMode]);

  useEffect(() => {
    setSelectedTasks([]);
  }, [grouptype, setSelectedTasks]);

  const isSpectator = usePermission([
    ESecuredIdentityRoleName.ManagingFirmSpectator,
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
    ESecuredIdentityRoleName.Supervisor,
  ]);

  const { apartmentId, housingStockId } = queryString.parse(
    window.location.search,
  );

  const lastGroupTypeRef = useRef<TaskGroupingFilter | null>(
    initialValues?.GroupType || null,
  );

  useEffect(() => {
    closeExtendedSearch();

    const isApartmentIdExist = Boolean(apartmentId);
    const isHousingStockIdExist = Boolean(housingStockId);
    if (isApartmentIdExist || isHousingStockIdExist) {
      lastGroupTypeRef.current = grouptype;
      return;
    }
    clearAddress();

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
  }, [
    grouptype,
    lastGroupTypeRef,
    apartmentId,
    housingStockId,
    changeFiltersByGroupType,
    changeGroupType,
    clearAddress,
    closeExtendedSearch,
  ]);

  const preparedTasks = useMemo(
    () => prepareData(pagedTasks?.items || [], grouptype),
    [pagedTasks?.items, grouptype],
  );

  useEffect(() => {
    if (apartment) {
      const apartmentAddress = getAddressObject(apartment.housingStock);
      handleSearch({
        ...apartmentAddress,
        ApartmentNumber: apartment.apartmentNumber || '',
        GroupType: grouptype,
        EngineeringElement: ETaskEngineeringElement.IndividualDevice,
      });
      return;
    }
    if (housingStock) {
      const apartmentAddress = getAddressObject(housingStock);
      handleSearch({
        ...apartmentAddress,
        GroupType: grouptype,
      });
    }
  }, [apartment, housingStock, handleSearch, grouptype]);

  const isPermissionToAddTask = usePermission([
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  ]);

  const isPermissionToShowSummary = usePermission([
    ESecuredIdentityRoleName.ManagingFirmSpectator,
  ]);

  return (
    <>
      {isPermissionToAddTask && <AddTaskDataFetchGate />}
      <InitialGate />
      <TaskTypesGate />

      <CloseTasksContainer />
      <ReassignTasksContainer />

      {isPermissionToAddTask && <AddTaskFromDispatcherContainer />}
      <TasksProfile
        handleExportTasksList={() => handleExportTasksList()}
        grouptype={grouptype}
        handleSearch={handleSearch}
        changePageNumber={changePageNumber}
        taskTypes={taskTypes}
        tasks={preparedTasks as TaskType[]}
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
        isSpectator={isSpectator}
        tasksPageSegment={tasksPageSegment}
        setTasksPageSegment={setTasksPageSegment}
        handleOpenAddTaskModal={handleOpenAddTaskModal}
        isPermissionToAddTask={isPermissionToAddTask}
        tasksSummaryData={tasksSummaryData}
        isPermissionToShowSummary={isPermissionToShowSummary}
        selectedTasks={selectedTasks}
        toggleTaskCheckbox={toggleTaskCheckbox}
        setSelectedTasks={setSelectedTasks}
        handleCloseTasks={handleCloseTasks}
        isControlMode={isControlMode}
        handleReassignTasks={handleReassignTasks}
      />
    </>
  );
};
