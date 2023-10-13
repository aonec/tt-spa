import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete as AutoCompleteAntD, Form } from 'antd';
import dayjs from 'api/dayjs';
import {
  ArrowRightLongIconDim,
  ContainerWithOutline,
  DatePickerSc,
  GridContainer,
  GridContainerAsymmetricLeft,
  GridContainerAsymmetricRight,
  GridContainerExpandable,
  OptionItemWrapper,
  ResourceDisconnectionAlertWrapper,
  ResourceDisconnectionDate,
  ResourseTypeWrapper,
  SearchIconSc,
  SelectCaret,
  TextareaSC,
  TimePickerSc,
  TopWrapper,
  WorkTitle,
  WorkTitleWrapper,
} from './AddTaskForm.styled';
import { AddTask, AddTaskFormProps } from './AddTaskForm.types';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import {
  EResourceType,
  EisTaskType,
  ResourceDisconnectingTypeResponse,
} from 'api/types';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.models';
import {
  ResourceShortNamesDictionary,
  TaskReasonTypeDictionary,
  TaskTypeDictionary,
} from 'dictionaries';
import { autocomplete, autocompleteApartNumber } from './AddTaskForm.utils';
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
  handleSelectHousingAddress,
  existingApartmentNumbers,
  resourceDisconnection,
  handleSelectApartmentNumber,
  apartmentHomeownerNames,
  taskReasons,
  handleSelectTaskReason,
  handleSelectTaskType,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<AddTask>({
    initialValues: {
      sourceId: '34ac5b2e-9ebd-11e8-8131-001dd8b88b72',
      requestNumber: null,
      taskType: null,
      workTypeId: null,
      requestDate: dayjs(),
      requestTime: dayjs(),
      addressSearch: '',
      apartmentNumber: null,
      subscriberName: null,
      phoneNumber: null,
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

  const isFromSubscriber = useMemo(
    () => values.sourceId === '34ac5b2e-9ebd-11e8-8131-001dd8b88b72',
    [values.sourceId],
  );

  const next = useSwitchInputOnEnter(dataKey, false, false);

  const isHaveValidationErrors = useMemo(
    () => Boolean(Object.keys(errors).length),
    [errors],
  );

  useEffect(() => {
    setDisableSubmit(isHaveValidationErrors);
  }, [isHaveValidationErrors, setDisableSubmit]);

  const preparedAddressOptions = useMemo(
    () => autocomplete(values.addressSearch, preparedForOptionsAddresses || []),
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
                  {TaskReasonTypeDictionary[taskReason.type]}
                </ResourseTypeWrapper>
                <ArrowRightLongIconDim />
                <WorkTitleWrapper>
                  <WorkTitle>{taskReason.name}</WorkTitle>
                </WorkTitleWrapper>
              </TopWrapper>
            </OptionItemWrapper>
          ),
          value: taskReason.name,
          key: `${taskReason.name}${index}`,
        };
      }),
    [taskReasons],
  );

  const taskTypeOptions = useMemo(() => {
    const selectedOption = taskReasons.find(
      (optionItem) => optionItem.name === values.taskReasonSearch,
    );

    const allowedTaskTypes =
      selectedOption?.items?.map((item) => item.taskType) || [];

    return allowedTaskTypes.map((taskType) => ({
      label: TaskTypeDictionary[taskType],
      value: taskType,
      key: taskType,
    }));
  }, [values.taskReasonSearch, taskReasons]);

  useEffect(() => {
    if (taskTypeOptions.length === 1) {
      const singularTaskType = taskTypeOptions[0].value;

      setFieldValue('taskType', singularTaskType);
      handleSelectTaskType(singularTaskType);

      if (isFromSubscriber) {
        next(6);
      } else {
        next(5);
      }
    }
  }, [
    taskTypeOptions,
    setFieldValue,
    next,
    isFromSubscriber,
    handleSelectTaskType,
  ]);

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

  // useEffect(() => {
  //   document.addEventListener('DOMContentLoaded', (event) => {
  //     console.log('first');
  //   });

  //   return () => document.removeEventListener()
  // }, [isFromSubscriber]);

  return (
    <>
      <PageGate />

      <Form id={formId} onSubmitCapture={handleSubmit}>
        <GridContainerExpandable isTwoColumn={isFromSubscriber}>
          <FormItem label="Источник заявки">
            <SelectCaret
              isFromSubscriber={isFromSubscriber}
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
              onSelect={() => next(0)}
            />
          </FormItem>

          {!isFromSubscriber && (
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
          )}

          <FormItem label="Дата и время заявки">
            <GridContainerAsymmetricLeft>
              <DatePickerSc
                format="DD.MM.YYYY"
                value={values.requestDate}
                onChange={(value) => setFieldValue('requestDate', value)}
              />

              <TimePickerSc
                value={values.requestTime || undefined}
                onChange={(value) => {
                  setFieldValue('requestTime', value);
                }}
              />
            </GridContainerAsymmetricLeft>
          </FormItem>
        </GridContainerExpandable>

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
              onKeyDown={fromEnter(() => {
                if (isFromSubscriber) {
                  next(1);
                } else {
                  next(2);
                }
              })}
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
              onKeyDown={fromEnter(() => {
                if (isFromSubscriber) {
                  next(2);
                } else {
                  next(3);
                }
              })}
            >
              <Input placeholder="Введите" />
            </AutoCompleteAntD>
          </FormItem>
        </GridContainerAsymmetricRight>

        {isFromSubscriber && (
          <GridContainer>
            <FormItem label="ФИО абонента">
              <AutoCompleteAntD
                allowClear
                value={values.subscriberName || undefined}
                onChange={(value) => setFieldValue('subscriberName', value)}
                options={apartmentHomeownerNames}
                data-reading-input={dataKey}
                onKeyDown={fromEnter(() => next(3))}
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
                onKeyDown={fromEnter(() => next(4))}
              />
            </FormItem>
          </GridContainer>
        )}

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
                if (isFromSubscriber) {
                  next(5);
                } else {
                  next(4);
                }
              })}
              open={isReasonOpen}
              onBlur={() => setReasonOpen(false)}
              onFocus={() => setReasonOpen(true)}
              onSelect={() => {
                setReasonOpen(false);
                if (isFromSubscriber) {
                  next(5);
                } else {
                  next(4);
                }
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
                if (isFromSubscriber) {
                  next(6);
                } else {
                  next(5);
                }
              })}
              open={isTaskTypeOpen}
              onBlur={() => setTaskTypeOpen(false)}
              onFocus={() => setTaskTypeOpen(true)}
              onSelect={(taskType) => {
                setTaskTypeOpen(false);
                handleSelectTaskType(taskType as EisTaskType);
                if (isFromSubscriber) {
                  next(6);
                } else {
                  next(5);
                }
              }}
              onMouseDown={() => setTaskTypeOpen(true)}
            />
          </FormItem>
        </ContainerWithOutline>

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
