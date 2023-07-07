import React, { useEffect, useMemo, useRef } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import {
  ESecuredIdentityRoleName,
  ETaskEngineeringElement,
  TaskGroupingFilter,
} from 'myApi';
import { exportTasksListService } from '../exportTasksListService';
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

const { ExistingCitiesGate } = addressSearchService.gates;
const { inputs, outputs, gates } = tasksProfileService;
const { ApartmentIdGate } = gates;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();

  const taskTypes = useStore(outputs.$taskTypes);
  const housingManagments = useStore(outputs.$housingManagments);
  const perpetrators = useStore(outputs.$organizationUsers);
  const pagedTasks = useStore(outputs.$tasksPagedData);
  const isLoading = useStore(outputs.$isLoading);
  const isExtendedSearchOpen = useStore(outputs.$isExtendedSearchOpen);
  const isSpectator = useStore(outputs.$isSpectator);
  const apartment = useStore(outputs.$apartment);
  const housingStock = useStore(outputs.$housingStock);
  const initialValues = useStore(outputs.$searchState);
  const tasksPageSegment = useStore(outputs.$tasksPageSegment);

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.exportTasksList,
  );
  const handleSearch = useEvent(inputs.searchTasks);
  const changeFiltersByGroupType = useEvent(inputs.changeFiltersByGroupType);
  const changeGroupType = useEvent(inputs.changeGroupType);
  const changePageNumber = useEvent(inputs.changePageNumber);
  const closeExtendedSearch = useEvent(inputs.extendedSearchClosed);
  const openExtendedSearch = useEvent(inputs.extendedSearchOpened);
  const clearFilters = useEvent(inputs.clearFilters);
  const clearAddress = useEvent(inputs.clearAddress);
  const setTasksPageSegment = useEvent(inputs.setTasksPageSegment);
  const handleOpenAddTaskModal = useEvent(inputs.handleOpenAddTaskModal);

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

  const isDispacher = usePermission([
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
        isDispacher={isDispacher}
      />
    </>
  );
};
