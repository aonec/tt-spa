import React, { useEffect, useMemo, useRef } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { ETaskEngineeringElement, TaskGroupingFilter } from 'myApi';
import { exportTasksListService } from '../exportTasksListService';
import { TaskTypesGate } from '../taskTypesService/taskTypesService.model';
import { tasksProfileService } from './tasksProfileService.model';
import {
  getAddressObject,
  prepareData,
  prepareQueryStringParam,
} from './tasksProfileService.utils';
import { TaskType } from './view/TasksListItem/TasksListItem.types';
import { TasksProfile } from './view/TasksProfile';
import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import queryString from 'query-string';

const { inputs, outputs, gates } = tasksProfileService;
const { ApartmentIdGate } = gates;

export const TasksProfileContainer = () => {
  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();
  const lastGroupTypeRef = useRef<TaskGroupingFilter | null>(null);

  const taskTypes = useStore(outputs.$taskTypes);
  const housingManagments = useStore(outputs.$housingManagments);
  const perpetrators = useStore(outputs.$perpetratorIdStore);
  const pagedTasks = useStore(outputs.$tasksPagedData);
  const isLoading = useStore(outputs.$isLoading);
  const isExtendedSearchOpen = useStore(outputs.$isExtendedSearchOpen);
  const isSpectator = useStore(outputs.$isSpectator);
  const apartment = useStore(outputs.$apartment);
  const housingStock = useStore(outputs.$housingStock);

  const handleExportTasksList = useEvent(
    exportTasksListService.inputs.exportTasksList
  );
  const handleSearch = useEvent(inputs.searchTasks);
  const changeFiltersByGroupType = useEvent(inputs.changeFiltersByGroupType);
  const changeGroupType = useEvent(inputs.changeGroupType);
  const changePageNumber = useEvent(inputs.changePageNumber);
  const closeExtendedSearch = useEvent(inputs.extendedSearchClosed);
  const openExtendedSearch = useEvent(inputs.extendedSearchOpened);
  const clearFilters = useEvent(inputs.clearFilters);
  const clearAddress = useEvent(inputs.clearAddress);

  const {
    apartmentId,
    housingStockId,
    pipeNodeId,
    housingMeteringDeviceId,
  } = queryString.parse(window.location.search);

  const preparedApartmentId = prepareQueryStringParam(apartmentId);

  const preparedHousingStockId = prepareQueryStringParam(housingStockId);

  const preparedPipeNodeId = prepareQueryStringParam(pipeNodeId);

  const preparedHousingMeteringDeviceId = prepareQueryStringParam(
    housingMeteringDeviceId
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

    if (!lastGroupTypeRef.current) {
      changeGroupType(grouptype);
    }

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
    () => prepareData(pagedTasks?.items || [], grouptype),
    [pagedTasks?.items]
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
  }, [apartment, housingStock]);

  return (
    <>
      {[
        preparedApartmentId,
        preparedHousingStockId,
        preparedPipeNodeId,
        housingMeteringDeviceId,
      ].some(Boolean) && (
        <ApartmentIdGate
          apartmentId={preparedApartmentId}
          housingStockId={preparedHousingStockId}
          pipeNodeId={preparedPipeNodeId}
          housingMeteringDeviceId={preparedHousingMeteringDeviceId}
        />
      )}
      <TaskTypesGate />
      <ExistingCitiesGate />
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
      />
    </>
  );
};
