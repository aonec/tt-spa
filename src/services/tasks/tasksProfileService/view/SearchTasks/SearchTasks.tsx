import { ExtendedSearch } from '01/shared/ui/ExtendedSearch';
import { InputSC } from '01/shared/ui/Fields';
import { Select } from 'antd';
import { useFormik } from 'formik';
import { EManagingFirmTaskFilterType, TaskGroupingFilter } from 'myApi';
import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import { SelectSC, Wrapper } from './SearchTasks.styled';
import { SearchTasksProps } from './SearchTasks.types';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';
import { TasksExtendedSearchForm } from './TasksExtendedSearch';
export const SearchTasks: FC<SearchTasksProps> = ({
  onSubmit,
  taskTypes,
  currentFilter,
  isExtendedSearchOpen,
  openExtendedSearch,
  closeExtendedSearch,
  clearFilters,
}) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik<GetTasksListRequestPayload>({
    initialValues: {
      TaskType: currentFilter?.TaskType || null,
      TaskId: currentFilter?.TaskId || '',
      TargetType: undefined,
      GroupType: currentFilter?.GroupType || undefined,
      DeviceId: undefined,
      HousingStockId: undefined,
      ApartmentId: undefined,
      HasChanged: undefined,
      PipeNodeId: undefined,
      ClosingStatuses: undefined,
      ApplicationCompetenceId: undefined,
      PageNumber: undefined,
      PageSize: undefined,
      OrderBy: undefined,
    },
    enableReinitialize: true,
    onSubmit,
  });

  const lastGroupTypeRef = useRef<TaskGroupingFilter | null>(null);

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


  const clearAllFilters = () => {
    clearFilters();
    resetForm();
  };
  
  useEffect(() => {
    if (lastGroupTypeRef.current === currentFilter?.GroupType!) {
      return;
    }
    const isFromArchive = lastGroupTypeRef.current === 'Archived';
    const isToArchive =
      currentFilter?.GroupType === 'Archived' && lastGroupTypeRef.current;
    if (isFromArchive || isToArchive) {
      clearInput();
    }

    lastGroupTypeRef.current = currentFilter.GroupType;
  }, [currentFilter?.GroupType, lastGroupTypeRef]);

  return (
    <ExtendedSearch
      isOpen={isExtendedSearchOpen}
      handleApply={() => handleSubmit()}
      handleClear={() => clearAllFilters()}
      handleClose={() => closeExtendedSearch()}
      handleOpen={() => openExtendedSearch()}
      extendedSearchContent={
        <>
          <TasksExtendedSearchForm
            setFieldValue={setFieldValue}
            taskTypes={taskTypes}
            values={values}
          />
        </>
      }
    >
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
