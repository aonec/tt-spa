import React, { useEffect, useMemo, useRef } from 'react';
import { useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import {
  ESecuredIdentityRoleName,
  ETaskEngineeringElement,
  TaskGroupingFilter,
} from 'myApi';
import { tasksProfileService } from './tasksProfileService.model';
import {
  getAddressObject,
  prepareData,
  prepareQueryStringParam,
} from './tasksProfileService.utils';
import { TaskType } from './view/TasksListItem/TasksListItem.types';
import { TasksProfile } from './view/TasksProfile';
import queryString from 'query-string';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { TaskTypesGate } from '../taskTypesService/taskTypesService.model';
import { AddTaskFromDispatcherContainer } from '../addTaskFromDispatcherService';
import { usePermission } from 'hooks/usePermission';
import { exportTasksListService } from '../exportTasksListService';

const { ExistingCitiesGate } = addressSearchService.gates;
const { inputs, outputs, gates } = tasksProfileService;
const { ApartmentIdGate } = gates;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();

  const {
    taskTypes,
    housingManagments,
    perpetrators,
    pagedTasks,
    isLoading,
    isExtendedSearchOpen,
    isSpectator,
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
  } = useUnit({
    taskTypes: outputs.$taskTypes,
    housingManagments: outputs.$housingManagments,
    perpetrators: outputs.$organizationUsers,
    pagedTasks: outputs.$tasksPagedData,
    isLoading: outputs.$isLoading,
    isExtendedSearchOpen: outputs.$isExtendedSearchOpen,
    isSpectator: outputs.$isSpectator,
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
  });

  const {
    apartmentId,
    housingStockId,
    pipeNodeId,
    housingMeteringDeviceId,
    calculatorId,
  } = queryString.parse(window.location.search);

  const preparedApartmentId = prepareQueryStringParam(apartmentId);

  const preparedHousingStockId = prepareQueryStringParam(housingStockId);

  const preparedPipeNodeId = prepareQueryStringParam(pipeNodeId);

  const preparedDeviceId = prepareQueryStringParam(
    housingMeteringDeviceId || calculatorId,
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

  return (
    <>
      {[
        preparedApartmentId,
        preparedHousingStockId,
        preparedPipeNodeId,
        housingMeteringDeviceId,
        calculatorId,
      ].some(Boolean) && (
        <ApartmentIdGate
          apartmentId={preparedApartmentId}
          housingStockId={preparedHousingStockId}
          pipeNodeId={preparedPipeNodeId}
          deviceId={preparedDeviceId}
        />
      )}
      <ExistingCitiesGate />
      <TaskTypesGate />
      <AddTaskFromDispatcherContainer />
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
      />
    </>
  );
};
