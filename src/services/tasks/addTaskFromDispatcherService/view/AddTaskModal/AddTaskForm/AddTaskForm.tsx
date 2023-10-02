import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete as AutoCompleteAntD, Form } from 'antd';
import dayjs from 'api/dayjs';
import {
  ArrowRightLongIconDim,
  ContainerWithOutline,
  GridContainer,
  GridContainerAsymmetricLeft,
  GridContainerAsymmetricRight,
  OptionItemWrapper,
  ResourceDisconnectionAlertWrapper,
  ResourceDisconnectionDate,
  ResourseTypeWrapper,
  SearchIconSc,
  SelectCaret,
  TextareaSC,
  TopWrapper,
  WorkTitle,
  WorkTitleWrapper,
} from './AddTaskForm.styled';
import { AddTask, AddTaskFormProps } from './AddTaskForm.types';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import {
  EResourceType,
  EisTaskType,
  ResourceDisconnectingTypeResponse,
} from 'api/types';
import { SelectTime } from 'ui-kit/SelectTime';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.models';
import {
  ResourceShortNamesDictionary,
  TaskReasonTypeDictionary,
  TaskTypeDictionary,
} from 'dictionaries';
import {
  autocompleteApartNumber,
  preparedAddressOption,
  sortByAlphabet,
} from './AddTaskForm.utils';
import { Alert } from 'ui-kit/Alert';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { validationSchema } from './AddTaskForm.constants';

const {
  gates: { PageGate },
} = addTaskFromDispatcherService;

const dataKey = 'add-task-form';

export const AddTaskForm: FC<AddTaskFormProps> = ({
  formId,
  ERPSources,
  preparedForOptionsAddresses,
  handleCreateTask,
  setDisableSubmit,
  choоseLeadExecutor,
  executors,
  leadExecutors,
  handleSelectHousingAddress,
  existingApartmentNumbers,
  resourceDisconnection,
  handleSelectApartmentNumber,
  apartmentHomeownerNames,
  taskReasons,
  handleSelectTaskReason,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<AddTask>({
    initialValues: {
      sourceId: null,
      requestNumber: null,
      taskType: null,
      workTypeId: null,
      requestDate: dayjs(),
      requestTime: dayjs().format('HH:00'),
      addressSearch: '',
      apartmentNumber: null,
      subscriberName: null,
      phoneNumber: null,
      leadId: null,
      executorId: null,
      taskDescription: null,
      taskReasonSearch: null,
    },
    validateOnBlur: true,
    validateOnMount: true,

    validationSchema,
    onSubmit: (data) => {
      handleCreateTask(data);
    },
  });

  const next = useSwitchInputOnEnter(dataKey, false, false);

  const sortedLeadExecutors = useMemo(
    () => sortByAlphabet(leadExecutors),
    [leadExecutors],
  );

  const sortedExecutors = useMemo(() => sortByAlphabet(executors), [executors]);

  const isHaveValidationErrors = useMemo(
    () => Boolean(Object.keys(errors).length),
    [errors],
  );

  useEffect(() => {
    setDisableSubmit(isHaveValidationErrors);
  }, [isHaveValidationErrors, setDisableSubmit]);

  const preparedAddressOptions = useMemo(
    () =>
      preparedAddressOption(
        values.addressSearch,
        preparedForOptionsAddresses || [],
      ),
    [values.addressSearch, preparedForOptionsAddresses],
  );

  const taskReasonOptions = useMemo(
    () =>
      taskReasons.map((taskReason, index) => {
        return {
          label: (
            <OptionItemWrapper>
              <TopWrapper>
                <ResourseTypeWrapper>
                  {TaskReasonTypeDictionary[taskReason.reasonType]}
                </ResourseTypeWrapper>
                <ArrowRightLongIconDim />
                <WorkTitleWrapper>
                  <WorkTitle>{taskReason.name}</WorkTitle>
                </WorkTitleWrapper>
              </TopWrapper>
            </OptionItemWrapper>
          ),
          value: taskReason.name,
          key: `${taskReason.id}${index}`,
        };
      }),
    [taskReasons],
  );

  const taskTypeOptions = useMemo(() => {
    const selectedOption = taskReasons.find(
      (optionItem) => optionItem.name === values.taskReasonSearch,
    );

    const allowedTaskTypes = selectedOption?.allowedTaskTypes || [];

    return allowedTaskTypes.map((taskType) => ({
      label: TaskTypeDictionary[taskType],
      value: taskType,
      key: taskType,
    }));
  }, [values.taskReasonSearch, taskReasons]);

  useEffect(() => {
    if (taskTypeOptions.length === 1) {
      setFieldValue('taskType', taskTypeOptions[0].value);
      next(7);
    }
  }, [taskTypeOptions, setFieldValue, next]);

  const getResourceDisconnectionAlert = useCallback(
    (
      disconnectingType: ResourceDisconnectingTypeResponse | null,
      resource: EResourceType,
      startDate: string,
      endDate: string | null,
    ) => {
      return (
        <ResourceDisconnectionAlertWrapper>
          <div>
            {disconnectingType?.description}{' '}
            {ResourceShortNamesDictionary[resource]} :
          </div>
          <ResourceDisconnectionDate>
            {dayjs(startDate).format('DD.MM.YYYY')}
            {endDate ? ` — ${dayjs(endDate).format('DD.MM.YYYY')}` : ''}
          </ResourceDisconnectionDate>
        </ResourceDisconnectionAlertWrapper>
      );
    },
    [],
  );

  const apartNumberOptions = useMemo(
    () =>
      autocompleteApartNumber(values.apartmentNumber, existingApartmentNumbers),
    [values.apartmentNumber, existingApartmentNumbers],
  );

  const sourceOptions = useMemo(
    () =>
      ERPSources.map((source) => ({
        value: source.id,
        key: source.id,
        label: source.name,
      })),
    [ERPSources],
  );

  const statusTaskType = useMemo(() => {
    if (values.taskType === EisTaskType.Emergency) {
      return 'error';
    }
    if (values.taskType === EisTaskType.Planned) {
      return 'warning';
    }
    return '';
  }, [values.taskType]);

  const [isNameOpen, setNameOpen] = useState(false);
  const [isReasonOpen, setReasonOpen] = useState(false);
  const [isTaskTypeOpen, setTaskTypeOpen] = useState(false);
  const [isLeadOpen, setLeadOpen] = useState(false);
  const [isExecutorOpen, setExecutorOpen] = useState(false);

  return (
    <>
      <PageGate />

      <Form id={formId} onSubmitCapture={handleSubmit}>
        <FormItem label="Дата заявки">
          <GridContainerAsymmetricLeft>
            <DatePicker
              value={values.requestDate}
              onChange={(value) => setFieldValue('requestDate', value)}
            />

            <SelectTime
              value={values.requestTime || undefined}
              onChange={(value) => setFieldValue('requestTime', value)}
            />
          </GridContainerAsymmetricLeft>
        </FormItem>

        <GridContainer>
          <FormItem label="Источник заявки">
            <SelectCaret
              showSearch
              placeholder="Выберите из списка"
              value={values.sourceId || undefined}
              onChange={(value) => setFieldValue('sourceId', value)}
              options={sourceOptions}
              optionFilterProp="label"
              optionLabelProp="label"
              filterOption={(inputValue, option) =>
                option?.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              }
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(0))}
            />
          </FormItem>

          <FormItem label="Номер заявки">
            <Input
              placeholder="Введите"
              value={values.requestNumber || undefined}
              onChange={(value) =>
                setFieldValue('requestNumber', value.target.value)
              }
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(1))}
            />
          </FormItem>
        </GridContainer>

        <GridContainerAsymmetricRight>
          <FormItem label="Адрес">
            <AutoCompleteAntD
              allowClear
              value={values.addressSearch}
              onChange={(value) => setFieldValue('addressSearch', value)}
              onSelect={(value) => {
                setFieldValue('selectedObjectAddress', value);
                handleSelectHousingAddress(value);
                values.apartmentNumber &&
                  handleSelectApartmentNumber(values.apartmentNumber);
              }}
              options={preparedAddressOptions}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(2))}
            >
              <Input prefix={<SearchIconSc />} placeholder="Начните вводить " />
            </AutoCompleteAntD>
          </FormItem>

          <FormItem label="Номер квартиры">
            <AutoCompleteAntD
              value={values.apartmentNumber}
              onChange={(value) => setFieldValue('apartmentNumber', value)}
              onSelect={(value) => {
                setFieldValue('apartmentNumber', value);
                handleSelectApartmentNumber(value);
              }}
              options={apartNumberOptions}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(3))}
            >
              <Input placeholder="Введите" />
            </AutoCompleteAntD>
          </FormItem>
        </GridContainerAsymmetricRight>

        <GridContainer>
          <FormItem label="ФИО абонента">
            <AutoCompleteAntD
              allowClear
              value={values.subscriberName || undefined}
              onChange={(value) => setFieldValue('subscriberName', value)}
              options={apartmentHomeownerNames}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(4))}
              open={isNameOpen}
              onBlur={() => setNameOpen(false)}
              onFocus={() => setNameOpen(true)}
              onSelect={() => setNameOpen(false)}
              onMouseDown={() => setNameOpen(true)}
            >
              <Input placeholder="Начните вводить" />
            </AutoCompleteAntD>
          </FormItem>
          <FormItem label="Номер телефона">
            <Input
              placeholder="Введите"
              value={values.phoneNumber || undefined}
              onChange={(value) =>
                setFieldValue('phoneNumber', value.target.value)
              }
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(5))}
            />
          </FormItem>
        </GridContainer>

        {Boolean(resourceDisconnection.length) &&
          resourceDisconnection.map((disconnection) => (
            <Alert centered>
              {getResourceDisconnectionAlert(
                disconnection.disconnectingType,
                disconnection.resource,
                disconnection.startDate,
                disconnection.endDate,
              )}
            </Alert>
          ))}

        <ContainerWithOutline>
          <FormItem label="Причина обращения">
            <Select
              showSearch
              allowClear
              virtual={false}
              status={statusTaskType}
              placeholder="Начните вводить"
              value={values.taskReasonSearch}
              onChange={(value) => {
                setFieldValue('taskReasonSearch', value);
                handleSelectTaskReason(value as string);
              }}
              optionFilterProp="value"
              optionLabelProp="value"
              options={taskReasonOptions}
              filterOption={(inputValue, option) =>
                option?.value
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              }
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                next(6);
              })}
              open={isReasonOpen}
              onBlur={() => setReasonOpen(false)}
              onFocus={() => setReasonOpen(true)}
              onSelect={() => {
                setReasonOpen(false);
                next(6);
              }}
              onMouseDown={() => setReasonOpen(true)}
            />
          </FormItem>
          <FormItem label="Тип заявки">
            <Select
              allowClear
              status={statusTaskType}
              placeholder="Начните вводить"
              value={values.taskType}
              onChange={(value) => {
                setFieldValue('taskType', value);
              }}
              optionLabelProp="label"
              options={taskTypeOptions}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                next(7);
              })}
              open={isTaskTypeOpen}
              onBlur={() => setTaskTypeOpen(false)}
              onFocus={() => setTaskTypeOpen(true)}
              onSelect={() => {
                setTaskTypeOpen(false);
                next(7);
              }}
              onMouseDown={() => setTaskTypeOpen(true)}
            />
          </FormItem>
        </ContainerWithOutline>

        <GridContainer>
          <FormItem label="Ответственный исполнитель">
            <Select
              allowClear
              showSearch
              optionFilterProp="label"
              optionLabelProp="label"
              placeholder="Выберите из списка"
              value={values.leadId || undefined}
              onChange={(value) => {
                setFieldValue('leadId', value);
                setFieldValue('executorId', null);
                choоseLeadExecutor(value as string);
              }}
              options={sortedLeadExecutors.map((leadExecutor) => ({
                value: leadExecutor.id,
                key: leadExecutor.id,
                label: leadExecutor.name,
              }))}
              filterOption={(inputValue, option) =>
                option?.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              }
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(8))}
              open={isLeadOpen}
              onBlur={() => setLeadOpen(false)}
              onFocus={() => setLeadOpen(true)}
              onSelect={() => {
                setLeadOpen(false);
                next(8);
              }}
              onMouseDown={() => setLeadOpen(true)}
            />
          </FormItem>
          <FormItem label="Исполнитель">
            <Select
              allowClear
              showSearch
              optionFilterProp="label"
              optionLabelProp="label"
              placeholder="Выберите из списка"
              value={values.executorId || undefined}
              onChange={(value) => setFieldValue('executorId', value)}
              disabled={!Boolean(values.leadId)}
              options={sortedExecutors.map((executor) => ({
                value: executor.id,
                key: executor.id,
                label: executor.name,
              }))}
              filterOption={(inputValue, option) =>
                option?.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              }
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => next(9))}
              open={isExecutorOpen}
              onBlur={() => setExecutorOpen(false)}
              onFocus={() => setExecutorOpen(true)}
              onSelect={() => {
                setExecutorOpen(false);
                next(9);
              }}
              onMouseDown={() => setExecutorOpen(true)}
            />
          </FormItem>
        </GridContainer>

        <FormItem label="Описание проблемы">
          <TextareaSC
            placeholder="Кратко опишите проблему"
            value={values.taskDescription || undefined}
            onChange={(value) =>
              setFieldValue('taskDescription', value.target.value)
            }
          />
        </FormItem>
      </Form>
    </>
  );
};
