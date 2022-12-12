import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import {
  EManagingFirmTaskFilterType,
  ETaskEngineeringElement,
  TaskGroupingFilter,
} from 'myApi';
import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { InputSC } from '01/shared/ui/Fields';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { ArchiveTasksExtendedSearchForm } from './ArchiveTasksExtendedSearchForm';
import { ToExecutionTasksExtendedSearchForm } from './ToExecutionTasksExtendedSearchForm';
import { SelectSC, Wrapper } from './SearchTasks.styled';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';
import { SearchTasksProps } from './SearchTasks.types';
import { ExistingStreetsGate } from '01/features/housingStocks/displayHousingStockStreets/model';
import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';

export const SearchTasks: FC<SearchTasksProps> = ({
  onSubmit,
  taskTypes,
  currentFilter,
  isExtendedSearchOpen,
  openExtendedSearch,
  closeExtendedSearch,
  clearFilters,
  changeFiltersByGroupType,
  housingManagments,
  perpetrators,
}) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik<GetTasksListRequestPayload>({
    initialValues: {
      TaskType: currentFilter?.TaskType || null,
      TaskId: currentFilter?.TaskId,
      TargetType: currentFilter?.TargetType,
      GroupType: currentFilter?.GroupType,
      HouseManagementId: currentFilter?.HouseManagementId,
      DeviceId: currentFilter?.DeviceId,
      HousingStockId: currentFilter?.HousingStockId,
      HasChanged: currentFilter?.HasChanged,
      PipeNodeId: currentFilter?.PipeNodeId,
      ClosingStatuses: currentFilter?.ClosingStatuses,
      ApplicationCompetenceId: currentFilter?.ApplicationCompetenceId,
      TimeStatus: currentFilter?.TimeStatus,
      PerpetratorId: currentFilter?.PerpetratorId,
      Resource: currentFilter?.Resource,
      EngineeringElement: currentFilter?.EngineeringElement,
      City: currentFilter?.City || '',
      Street: currentFilter?.Street,
      HousingStockNumber: currentFilter?.HousingStockNumber,
      Corpus: currentFilter?.Corpus,
      ApartmentNumber: currentFilter?.ApartmentNumber,
      PageNumber: currentFilter?.PageNumber,
      PageSize: currentFilter?.PageSize,
      OrderBy: currentFilter?.OrderBy,
    },
    enableReinitialize: true,
    onSubmit,
  });

  const lastGroupTypeRef = useRef<TaskGroupingFilter | undefined>(undefined);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(e.target.name, e.target.value);
    },
    [setFieldValue]
  );
  const handleKeyDown = useCallback(
    fromEnter((e) => {
      e.currentTarget.blur();
      setFieldValue(e.target.name, e.target.value);
      handleSubmit();
    }),
    [setFieldValue, handleSubmit]
  );
  const clearInput = useCallback(() => {
    setFieldValue('TaskId', '');
  }, [setFieldValue]);

  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();

  const clearAllFilters = () => {
    clearFilters();
    resetForm();
    changeFiltersByGroupType(grouptype);
  };

  useEffect(() => {
    if (lastGroupTypeRef.current === currentFilter?.GroupType) {
      return;
    }
    const isFromArchive = lastGroupTypeRef.current === 'Archived';
    const isToArchive =
      currentFilter?.GroupType === 'Archived' && lastGroupTypeRef.current;
    if (isFromArchive || isToArchive) {
      clearInput();
    }

    lastGroupTypeRef.current = currentFilter?.GroupType;
  }, [currentFilter?.GroupType, lastGroupTypeRef, clearInput]);

  const isArchived = currentFilter?.GroupType === 'Archived';
  return (
    <ExtendedSearch
      isOpen={isExtendedSearchOpen}
      handleApply={handleSubmit}
      handleClear={clearAllFilters}
      handleClose={closeExtendedSearch}
      handleOpen={openExtendedSearch}
      extendedSearchContent={
        <>
          {isArchived && (
            <ArchiveTasksExtendedSearchForm
              setFieldValue={setFieldValue}
              taskTypes={taskTypes}
              values={values}
            />
          )}
          {!isArchived && (
            <ToExecutionTasksExtendedSearchForm
              setFieldValue={setFieldValue}
              taskTypes={taskTypes}
              values={values}
              housingManagments={housingManagments}
              perpetrators={perpetrators}
            />
          )}
        </>
      }
    >
      <ExistingStreetsGate City={values.City} />
      <ExistingCitiesGate />
      <Wrapper>
        <InputSC
          placeholder="Номер задачи"
          value={values.TaskId}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={clearInput}
          name="TaskId"
        />
        <SelectSC
          placeholder="Тип задачи"
          value={values.TaskType!}
          onChange={(value) => {
            setFieldValue('TaskType', value as EManagingFirmTaskFilterType);
            handleSubmit();
          }}
        >
          {taskTypes &&
            taskTypes.map(({ value, key }) => (
              <Select.Option key={key!} value={key!}>
                {value}
              </Select.Option>
            ))}
        </SelectSC>
      </Wrapper>
    </ExtendedSearch>
  );
};
