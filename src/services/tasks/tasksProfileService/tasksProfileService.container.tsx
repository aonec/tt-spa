import React, { useEffect, useMemo, useRef } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { TaskGroupingFilter } from 'myApi';
import { exportTasksListService } from '../exportTasksListService';
import { TaskTypesGate } from '../taskTypesService/taskTypesService.model';
import { tasksProfileService } from './tasksProfileService.model';
import { prepareData } from './tasksProfileService.utils';
import { TaskType } from './view/TasksListItem/TasksListItem.types';
import { TasksProfile } from './view/TasksProfile';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import queryString from 'query-string';

const { inputs, outputs, gates } = tasksProfileService;
const { outputs: adresses } = addressSearchService;
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
  const streets = useStore(adresses.streets);
  const cities = useStore($existingCities);

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

  const { apartmentId } = queryString.parse(window.location.search);

  useEffect(() => {
    closeExtendedSearch();
    const isApartmentIdExist = Boolean(apartmentId);

    if (!isApartmentIdExist) {
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
    }
    lastGroupTypeRef.current = grouptype;
  }, [grouptype, lastGroupTypeRef]);

  const initialValues = useStore(outputs.$searchState);
  const preparedTasks = useMemo(
    () => prepareData(pagedTasks?.items || [], grouptype),
    [pagedTasks?.items]
  );

  return (
    <>
      {apartmentId && <ApartmentIdGate apartmentId={apartmentId as string} />}
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
        streets={streets}
        cities={cities}
        isSpectator={isSpectator}
      />
    </>
  );
};
