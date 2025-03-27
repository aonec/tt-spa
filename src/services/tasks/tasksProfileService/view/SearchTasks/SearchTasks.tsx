import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import {
  EOrderByRule,
  TaskGroupingFilter,
  TaskPaginationOrderRule,
} from 'api/types';
import { ExtendedSearch } from 'ui-kit/ExtendedSearch';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { ArchiveTasksExtendedSearchForm } from './ArchiveTasksExtendedSearchForm';
import { SortContainer, SortTitle, Wrapper } from './SearchTasks.styled';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';
import { SearchTasksProps } from './SearchTasks.types';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { ToExecutionTasksExtendedSearchForm } from './ToExecutionTasksExtendedSearchForm';
import { Sort } from 'ui-kit/Sort';

const { ExistingCitiesGate, ExistingStreetsGate } = addressSearchService.gates;

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
  isControlMode,
}) => {
  const { values, handleSubmit, setFieldValue, resetForm } =
    useFormik<GetTasksListRequestPayload>({
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
        City: currentFilter?.City,
        Street: currentFilter?.Street,
        HousingStockNumber: currentFilter?.HousingStockNumber,
        Corpus: currentFilter?.Corpus,
        ApartmentNumber: currentFilter?.ApartmentNumber,
        PageNumber: currentFilter?.PageNumber,
        PageSize: currentFilter?.PageSize,
        OrderBy: currentFilter?.OrderBy,
        OrderRule: currentFilter?.OrderRule,
      },
      enableReinitialize: true,
      onSubmit,
    });

  const lastGroupTypeRef = useRef<TaskGroupingFilter | undefined>(undefined);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(e.target.name, e.target.value);
    },
    [setFieldValue],
  );

  const handleKeyDown = useMemo(
    () =>
      fromEnter((e) => {
        e.currentTarget.blur();
        const event = e as unknown as React.ChangeEvent<HTMLInputElement>;

        setFieldValue(event.target.name, event.target.value);
        handleSubmit();
      }),
    [setFieldValue, handleSubmit],
  );

  const clearInput = useCallback(() => {
    setFieldValue('TaskId', '');
  }, [setFieldValue]);

  const { grouptype } = useParams<{ grouptype: TaskGroupingFilter }>();

  const clearAllFilters = useCallback(() => {
    clearFilters();
    resetForm();
    if (grouptype) changeFiltersByGroupType(grouptype);
  }, [clearFilters, resetForm, changeFiltersByGroupType, grouptype]);

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

  const handleSortChange = () => {
    let order = EOrderByRule.Descending;

    if (values.OrderBy === EOrderByRule.Descending) {
      order = EOrderByRule.Ascending;
    }

    setFieldValue('OrderBy', order);
    handleSubmit();
  };

  return (
    <ExtendedSearch
      isOpen={isExtendedSearchOpen}
      handleApply={handleSubmit}
      handleClear={clearAllFilters}
      handleClose={closeExtendedSearch}
      handleOpen={openExtendedSearch}
      isPaddingSearch={!isControlMode}
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
      <ExistingCitiesGate />
      <ExistingStreetsGate City={values.City} />
      <Wrapper>
        <Input
          small
          placeholder="Номер задачи"
          value={values.TaskId}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={clearInput}
          name="TaskId"
        />
        <Select
          small
          data-test="task-type-selector"
          placeholder="Тип задачи"
          value={values.TaskType || undefined}
          onChange={(value) => {
            setFieldValue('TaskType', value);
            handleSubmit();
          }}
        >
          {taskTypes &&
            taskTypes.map(({ value, key }) => (
              <Select.Option key={key!} value={key || undefined}>
                {value}
              </Select.Option>
            ))}
        </Select>

        <SortContainer>
          <SortTitle>Сортировать по:</SortTitle>
          <Select
            small
            placeholder={'Выберите'}
            onChange={(value) => {
              setFieldValue('OrderRule', value);
              handleSubmit();
            }}
            value={values.OrderRule}
          >
            <Select.Option
              small
              value={TaskPaginationOrderRule.ConfirmationTime}
            >
              Дате подтверждения
            </Select.Option>

            <Select.Option small value={TaskPaginationOrderRule.CreationTime}>
              Дате создания
            </Select.Option>

            <Select.Option small value={TaskPaginationOrderRule.TimeStatus}>
              Статусу выполнения
            </Select.Option>
          </Select>

          <Sort value={values.OrderBy} handleChange={handleSortChange} />
        </SortContainer>
      </Wrapper>
    </ExtendedSearch>
  );
};
