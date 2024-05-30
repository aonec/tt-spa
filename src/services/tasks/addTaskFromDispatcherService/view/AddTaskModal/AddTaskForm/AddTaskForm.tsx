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
  GridContainerAsymmetricThreeColumn,
  GridContainerExpandable,
  OptionItemWrapper,
  ResourceDisconnectionAlertWrapper,
  ResourceDisconnectionDate,
  ResourseTypeWrapper,
  SearchIconSc,
  SelectCaret,
  SelectExpandable,
  TextareaSC,
  TimePickerLarge,
  TimePickerMedium,
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
import {
  ResourceShortNamesDictionary,
  TaskReasonTypeDictionary,
  TaskTypeDictionary,
} from 'dictionaries';
import {
  autocompleteAddress,
  autocompleteApartNumber,
  autocompleteReason,
  filterData,
} from './AddTaskForm.utils';
import { Alert } from 'ui-kit/Alert';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { validationSchema } from './AddTaskForm.constants';
import { DatePicker } from 'ui-kit/DatePicker';
import { SavePhoneNumber } from './savePhoneNumberService';
import { AlertIconType } from 'ui-kit/Alert/Alert.types';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';

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
  isManualDeadlineRequired,
  selectedTaskReasonOption,
  handleChangeSubscriberName,
  handleChangePhoneNumber,
  isSavePhoneNumberOpen,
  handleReplacePhoneNumber,
  handleClosePhoneNumber,
  onSuccessSavePhone,
  existingCities,
  defaultCity,
  handleChangeCity,
  handleSearchExecutor,
  executorsList,
}) => {
  const initialSource = useMemo(() => ERPSources[0], [ERPSources]);
  const initialCity = useMemo(
    () => existingCities?.[0] || 'Город не найден',
    [existingCities],
  );

  const { values, handleSubmit, setFieldValue, isValid, setValues } =
    useFormik<AddTask>({
      initialValues: {
        sourceId: initialSource?.id || null,
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
        taskReasonOrderNumber: null,
        taskDeadlineDate: null,
        taskDeadlineTime: dayjs().subtract(2, 'minutes'),
        isSourceNumberRequired: initialSource?.isSourceNumberRequired || false,
        isSubscriberRequired: initialSource?.isSubscriberRequired || false,
        isManualDeadlineRequired: isManualDeadlineRequired,
        city: defaultCity || initialCity,
        executorId: null,
      },
      validateOnBlur: true,
      validateOnMount: true,
      validationSchema,
      onSubmit: (data) => {
        const filteredData = filterData(data);
        handleCreateTask(filteredData);
      },
    });

  const isInitialSource = useMemo(
    () => values.sourceId === initialSource?.id,
    [values.sourceId, initialSource?.id],
  );

  const selectedSource = useMemo(() => {
    return ERPSources.find((source) => source.id === values.sourceId);
  }, [ERPSources, values.sourceId]);

  const isSourceNumberRequired = useMemo(
    () => Boolean(selectedSource?.isSourceNumberRequired),
    [selectedSource],
  );
  const isSubscriberRequired = useMemo(
    () => Boolean(selectedSource?.isSubscriberRequired),
    [selectedSource],
  );

  const isSubscriberAndSourceNumberRequired = [
    isSubscriberRequired,
    isSourceNumberRequired,
  ].every(Boolean);
  const isOnlySubscriberRequired = [
    isSubscriberRequired,
    !isSourceNumberRequired,
  ].every(Boolean);
  const isOnlySourceNumberRequired = [
    !isSubscriberRequired,
    isSourceNumberRequired,
  ].every(Boolean);
  const isNoAdditionalFieldsRequired = [
    !isSubscriberRequired,
    !isSourceNumberRequired,
  ].every(Boolean);

  const next = useSwitchInputOnEnter(dataKey, false, false);

  useEffect(() => {
    return onSuccessSavePhone.watch(() => {
      if (isOnlySubscriberRequired) {
        next(4);
      } else {
        next(5);
      }
      return;
    }).unsubscribe;
  }, [onSuccessSavePhone, isOnlySubscriberRequired, next]);

  useEffect(() => {
    handleChangePhoneNumber(values?.phoneNumber || null);
  }, [values.phoneNumber, handleChangePhoneNumber]);

  useEffect(() => {
    setFieldValue('isSourceNumberRequired', isSourceNumberRequired);
  }, [isSourceNumberRequired, setFieldValue]);

  useEffect(() => {
    setFieldValue('isSubscriberRequired', isSubscriberRequired);
  }, [isSubscriberRequired, setFieldValue]);

  useEffect(() => {
    setFieldValue('isManualDeadlineRequired', isManualDeadlineRequired);
  }, [isManualDeadlineRequired, setFieldValue]);

  useEffect(() => {
    setDisableSubmit(!isValid);
  }, [isValid, setDisableSubmit]);

  const preparedAddressOptions = useMemo(
    () =>
      autocompleteAddress(
        values.addressSearch,
        preparedForOptionsAddresses || [],
      ),
    [values.addressSearch, preparedForOptionsAddresses],
  );

  const taskReasonOptions = useMemo(
    () =>
      autocompleteReason(values.taskReasonSearch, taskReasons).map(
        (taskReason) => {
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
            value: `${taskReason.orderNumber}_${taskReason.name}`,
            key: taskReason.orderNumber,
          };
        },
      ),
    [values.taskReasonSearch, taskReasons],
  );

  const taskTypeOptions = useMemo(() => {
    const allowedTaskTypes = selectedTaskReasonOption?.taskTypes || [];

    return allowedTaskTypes.map((taskType) => ({
      label: TaskTypeDictionary[taskType],
      value: taskType,
      key: taskType,
    }));
  }, [selectedTaskReasonOption]);

  const executorsListOptions = useMemo(() => {
    return executorsList.map((executor) => ({
      label: executor.name,
      value: executor.ttmId,
      key: executor.ttmId,
    }));
  }, [executorsList]);

  useEffect(() => {
    if (taskTypeOptions.length === 1) {
      const singularTaskType = taskTypeOptions[0].value;

      setFieldValue('taskType', singularTaskType);
      handleSelectTaskType(singularTaskType);

      if (isNoAdditionalFieldsRequired) {
        next(4);
      }
      if (isOnlySourceNumberRequired) {
        next(5);
      }
      if (isOnlySubscriberRequired) {
        next(6);
      }
      if (isSubscriberAndSourceNumberRequired) {
        next(7);
      }
    }
  }, [
    taskTypeOptions,
    setFieldValue,
    next,
    handleSelectTaskType,
    isSubscriberAndSourceNumberRequired,
    isOnlySourceNumberRequired,
    isOnlySubscriberRequired,
    isNoAdditionalFieldsRequired,
  ]);

  useEffect(() => {
    if (executorsList.length === 1) {
      const singularExecutorId = executorsList[0].ttmId;

      setFieldValue('executorId', singularExecutorId);
    }
  }, [executorsList, setFieldValue]);

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

  const preparedExistingCities = getPreparedStreetsOptions(
    values.city || '',
    existingCities || [],
  );

  const statusTaskType = useMemo(() => {
    if (values.taskType === EisTaskType.Emergency) {
      return 'error';
    }
    return '';
  }, [values.taskType]);

  const [isNameOpen, setNameOpen] = useState(false);
  const [isReasonOpen, setReasonOpen] = useState(false);
  const [isTaskTypeOpen, setTaskTypeOpen] = useState(false);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isExecutorOpen, setExecutorOpen] = useState(false);

  return (
    <>
      <PageGate />

      <Form id={formId} onSubmitCapture={handleSubmit}>
        <GridContainerExpandable isTwoColumn={!isSourceNumberRequired}>
          <FormItem label="Источник заявки">
            <SelectCaret
              isInitialSource={isInitialSource}
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

          {isSourceNumberRequired && (
            <FormItem label="Номер в источнике">
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

              <TimePickerLarge
                value={values.requestTime || undefined}
                onChange={(value) => {
                  setFieldValue('requestTime', value);
                }}
              />
            </GridContainerAsymmetricLeft>
          </FormItem>
        </GridContainerExpandable>

        <GridContainerAsymmetricRight>
          <FormItem label="Город">
            <Select
              onChange={(value) => {
                setFieldValue('city', value);
                handleChangeCity(value as string);
              }}
              value={values.city || undefined}
              placeholder="Выберите из списка"
              options={preparedExistingCities}
            />
          </FormItem>
          <FormItem label="Адрес">
            <AutoCompleteAntD
              defaultActiveFirstOption
              showSearch
              allowClear
              value={values.addressSearch}
              onChange={(value) => {
                setValues({
                  ...values,
                  addressSearch: value,
                  apartmentNumber: null,
                  subscriberName: null,
                  phoneNumber: null,
                });
              }}
              onSelect={(value) => {
                setFieldValue('selectedObjectAddress', value);
                handleSelectHousingAddress(value);
                values.apartmentNumber &&
                  handleSelectApartmentNumber(values.apartmentNumber);

                if (isOnlySubscriberRequired || isNoAdditionalFieldsRequired) {
                  next(1);
                } else {
                  next(2);
                }
              }}
              options={preparedAddressOptions}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                if (isOnlySubscriberRequired || isNoAdditionalFieldsRequired) {
                  next(1);
                } else {
                  next(2);
                }
              })}
            >
              <Input
                prefix={<SearchIconSc />}
                onChange={(e) => setFieldValue('addressSearch', e.target.value)}
                value={values.addressSearch}
                placeholder="Начните вводить"
              />
            </AutoCompleteAntD>
          </FormItem>

          <FormItem label="Номер квартиры">
            <AutoCompleteAntD
              defaultActiveFirstOption
              value={values.apartmentNumber}
              onChange={(value) => {
                setValues({
                  ...values,
                  apartmentNumber: value,
                  subscriberName: null,
                  phoneNumber: null,
                });
              }}
              onSelect={(value) => {
                setFieldValue('apartmentNumber', value);
                handleSelectApartmentNumber(value);

                if (isOnlySubscriberRequired || isNoAdditionalFieldsRequired) {
                  next(2);
                } else {
                  next(3);
                }
              }}
              options={apartNumberOptions}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                if (isOnlySubscriberRequired || isNoAdditionalFieldsRequired) {
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

        {isSubscriberRequired && (
          <GridContainer>
            <FormItem label="ФИО абонента">
              <AutoCompleteAntD
                defaultActiveFirstOption
                allowClear
                value={values.subscriberName || undefined}
                onChange={(value) => {
                  setFieldValue('subscriberName', value);
                  setFieldValue('phoneNumber', null);
                  handleChangeSubscriberName(value);
                }}
                options={apartmentHomeownerNames}
                data-reading-input={dataKey}
                onKeyDown={fromEnter(() => {
                  if (isOnlySubscriberRequired) {
                    next(3);
                  } else {
                    next(4);
                  }
                })}
                open={isNameOpen}
                onBlur={() => setNameOpen(false)}
                onFocus={() => setNameOpen(true)}
                onSelect={() => {
                  setNameOpen(false);

                  if (isOnlySubscriberRequired) {
                    next(3);
                  } else {
                    next(4);
                  }
                }}
                onMouseDown={() => setNameOpen(true)}
              >
                <Input placeholder="Начните вводить" />
              </AutoCompleteAntD>
            </FormItem>
            <FormItem label="Номер телефона">
              <SavePhoneNumber
                isOpen={isSavePhoneNumberOpen}
                handleReplacePhoneNumber={handleReplacePhoneNumber}
                handleClosePhoneNumber={handleClosePhoneNumber}
              >
                <Input
                  placeholder="Введите"
                  value={values.phoneNumber || undefined}
                  onChange={(value) => {
                    setFieldValue('phoneNumber', value.target.value);
                  }}
                  data-reading-input={dataKey}
                  onKeyDown={fromEnter(() => {
                    if (isOnlySubscriberRequired) {
                      next(4);
                    } else {
                      next(5);
                    }
                  })}
                />
              </SavePhoneNumber>
            </FormItem>
          </GridContainer>
        )}

        {Boolean(resourceDisconnection.length) &&
          resourceDisconnection.map((disconnection) => (
            <Alert centered icon={AlertIconType.info}>
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
            <SelectExpandable
              showSearch
              allowClear
              filterOption={false}
              virtual
              placeholder="Начните вводить"
              value={values.taskReasonOrderNumber}
              onClear={() => {
                setFieldValue('taskReasonSearch', null);
                setFieldValue('taskReasonOrderNumber', null);
              }}
              onSearch={(value) => {
                setFieldValue('taskReasonSearch', value);
              }}
              onSelect={(value) => {
                const valueString = value as string;

                const name = valueString.split('_')[1];

                setFieldValue('taskReasonOrderNumber', valueString);
                setFieldValue('taskReasonSearch', name);
                handleSelectTaskReason(name);

                handleSearchExecutor();

                setReasonOpen(false);
                if (isNoAdditionalFieldsRequired) {
                  next(3);
                }
                if (isOnlySourceNumberRequired) {
                  next(4);
                }
                if (isOnlySubscriberRequired) {
                  next(5);
                }
                if (isSubscriberAndSourceNumberRequired) {
                  next(6);
                }
              }}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                if (isNoAdditionalFieldsRequired) {
                  next(3);
                }
                if (isOnlySourceNumberRequired) {
                  next(4);
                }
                if (isOnlySubscriberRequired) {
                  next(5);
                }
                if (isSubscriberAndSourceNumberRequired) {
                  next(6);
                }
              })}
              open={isReasonOpen}
              onBlur={() => setReasonOpen(false)}
              onFocus={() => {
                setReasonOpen(true);
                handleClosePhoneNumber();
              }}
              onMouseDown={() => setReasonOpen(true)}
            >
              {taskReasonOptions.map((elem) => (
                <Select.Option value={elem.value}>{elem.label}</Select.Option>
              ))}
            </SelectExpandable>
          </FormItem>

          <FormItem label="Тип заявки">
            <Select
              allowClear
              status={statusTaskType}
              placeholder="Начните вводить"
              value={values.taskType}
              onChange={(value) => {
                setValues({
                  ...values,
                  taskType: value as EisTaskType | null,
                  taskDeadlineDate: null,
                });
              }}
              optionLabelProp="label"
              options={taskTypeOptions}
              data-reading-input={dataKey}
              onKeyDown={fromEnter(() => {
                if (isNoAdditionalFieldsRequired) {
                  next(4);
                }
                if (isOnlySourceNumberRequired) {
                  next(5);
                }
                if (isOnlySubscriberRequired) {
                  next(6);
                }
                if (isSubscriberAndSourceNumberRequired) {
                  next(7);
                }
              })}
              open={isTaskTypeOpen}
              onBlur={() => setTaskTypeOpen(false)}
              onFocus={() => setTaskTypeOpen(true)}
              onSelect={(taskType) => {
                setTaskTypeOpen(false);
                handleSelectTaskType(taskType as EisTaskType);

                handleSearchExecutor();

                if (isNoAdditionalFieldsRequired) {
                  next(4);
                }
                if (isOnlySourceNumberRequired) {
                  next(5);
                }
                if (isOnlySubscriberRequired) {
                  next(6);
                }
                if (isSubscriberAndSourceNumberRequired) {
                  next(7);
                }
              }}
              onMouseDown={() => setTaskTypeOpen(true)}
            />
          </FormItem>

          <FormItem label="Срок выполнения">
            <GridContainerAsymmetricThreeColumn>
              <DatePicker
                data-reading-input={dataKey}
                allowClear
                format="DD.MM.YYYY"
                open={isDatePickerOpen}
                onBlur={() => setDatePickerOpen(false)}
                onFocus={() => setDatePickerOpen(true)}
                onMouseDown={() => setDatePickerOpen(true)}
                value={values.taskDeadlineDate}
                onChange={(value) => setFieldValue('taskDeadlineDate', value)}
                onKeyDown={fromEnter(() => {
                  if (isNoAdditionalFieldsRequired) {
                    next(5);
                  }
                  if (isOnlySourceNumberRequired) {
                    next(6);
                  }
                  if (isOnlySubscriberRequired) {
                    next(7);
                  }
                  if (isSubscriberAndSourceNumberRequired) {
                    next(8);
                  }
                })}
                onSelect={() => {
                  if (isNoAdditionalFieldsRequired) {
                    next(5);
                  }
                  if (isOnlySourceNumberRequired) {
                    next(6);
                  }
                  if (isOnlySubscriberRequired) {
                    next(7);
                  }
                  if (isSubscriberAndSourceNumberRequired) {
                    next(8);
                  }
                }}
              />

              <TimePickerMedium
                data-reading-input={dataKey}
                value={values.taskDeadlineTime || undefined}
                onChange={(value) => {
                  setFieldValue('taskDeadlineTime', value);
                }}
                onKeyDown={fromEnter(() => {
                  if (isNoAdditionalFieldsRequired) {
                    next(6);
                  }
                  if (isOnlySourceNumberRequired) {
                    next(7);
                  }
                  if (isOnlySubscriberRequired) {
                    next(8);
                  }
                  if (isSubscriberAndSourceNumberRequired) {
                    next(9);
                  }
                })}
                onSelect={() => {
                  if (isNoAdditionalFieldsRequired) {
                    next(6);
                  }
                  if (isOnlySourceNumberRequired) {
                    next(7);
                  }
                  if (isOnlySubscriberRequired) {
                    next(8);
                  }
                  if (isSubscriberAndSourceNumberRequired) {
                    next(9);
                  }
                }}
              />
              <div></div>
            </GridContainerAsymmetricThreeColumn>
          </FormItem>
        </ContainerWithOutline>

        <FormItem label="Исполнитель">
          <Select
            allowClear
            placeholder="Начните вводить"
            value={values.executorId}
            onChange={(value) => {
              setFieldValue('executorId', value);
            }}
            optionLabelProp="label"
            options={executorsListOptions}
            data-reading-input={dataKey}
            open={isExecutorOpen}
            onBlur={() => setExecutorOpen(false)}
            onFocus={() => setExecutorOpen(true)}
            onMouseDown={() => setExecutorOpen(true)}
            onKeyDown={fromEnter(() => {
              if (isNoAdditionalFieldsRequired) {
                next(7);
              }
              if (isOnlySourceNumberRequired) {
                next(8);
              }
              if (isOnlySubscriberRequired) {
                next(9);
              }
              if (isSubscriberAndSourceNumberRequired) {
                next(10);
              }
            })}
            onSelect={() => {
              if (isNoAdditionalFieldsRequired) {
                next(7);
              }
              if (isOnlySourceNumberRequired) {
                next(8);
              }
              if (isOnlySubscriberRequired) {
                next(9);
              }
              if (isSubscriberAndSourceNumberRequired) {
                next(10);
              }
            }}
          />
        </FormItem>

        <FormItem label="Описание проблемы">
          <TextareaSC
            data-reading-input={dataKey}
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
