import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AutoComplete as AutoCompleteAntD, Form } from 'antd';
import dayjs from 'api/dayjs';
import {
  ContainerWithOutline,
  DatePickerSc,
  GridContainer,
  GridContainerAsymmetricLeft,
  GridContainerAsymmetricRight,
  GridContainerAsymmetricThreeColumn,
  GridContainerExpandable,
  ResourceDisconnectionAlertWrapper,
  ResourceDisconnectionDate,
  SearchIconSc,
  SelectCaret,
  TextareaSC,
  TimePickerLarge,
  TimePickerMedium,
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
import { ResourceShortNamesDictionary, TaskTypeDictionary } from 'dictionaries';
import {
  autocompleteAddress,
  autocompleteApartNumber,
  filterData,
} from './AddTaskForm.utils';
import { Alert } from 'ui-kit/Alert';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { validationSchema } from './AddTaskForm.constants';
import { SavePhoneNumber } from './savePhoneNumberService';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';
import { DatePicker } from 'ui-kit/DatePicker';
import { Reason } from './form_items';

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
        taskDeadlineDate: dayjs(),
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

  const {
    isSourceNumberRequired,
    isSubscriberRequired,
    isSubscriberAndSourceNumberRequired,
    isOnlySubscriberRequired,
    isOnlySourceNumberRequired,
    isNoAdditionalFieldsRequired,
  } = useMemo(() => {
    const selectedSource = ERPSources.find(
      (source) => source.id === values.sourceId,
    );

    const isSourceNumberRequired = Boolean(
      selectedSource?.isSourceNumberRequired,
    );
    const isSubscriberRequired = Boolean(selectedSource?.isSubscriberRequired);
    const isSubscriberAndSourceNumberRequired =
      isSubscriberRequired && isSourceNumberRequired;
    const isOnlySubscriberRequired =
      isSubscriberRequired && !isSourceNumberRequired;
    const isOnlySourceNumberRequired =
      !isSubscriberRequired && isSourceNumberRequired;
    const isNoAdditionalFieldsRequired =
      !isSubscriberRequired && !isSourceNumberRequired;

    return {
      isSourceNumberRequired,
      isSubscriberRequired,
      isSubscriberAndSourceNumberRequired,
      isOnlySubscriberRequired,
      isOnlySourceNumberRequired,
      isNoAdditionalFieldsRequired,
    };
  }, [ERPSources, values.sourceId]);

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
    }
  }, [
    taskTypeOptions,
    setFieldValue,
    next,
    handleSelectTaskType,
    handleSearchExecutor,
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
                format={{ format: 'DD.MM.YYYY', type: 'mask' }}
                value={values.requestDate}
                onChange={(value) => setFieldValue('requestDate', value)}
              />

              <TimePickerLarge
                value={values.requestTime || undefined}
                onChange={(value) => {
                  setFieldValue('requestTime', value);
                }}
                onKeyDown={(event) => {
                  const target = event.currentTarget as HTMLInputElement;
                  if (event.key !== 'Backspace' && target.value.length === 2) {
                    target.value = target.value + ':';
                  }
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
                if (values.apartmentNumber) {
                  handleSelectApartmentNumber(values.apartmentNumber);
                }

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
            <Alert centered icon="info" key={disconnection.id}>
              {getResourceDisconnectionAlert(
                disconnection.disconnectingType,
                disconnection.resource,
                disconnection.startDate,
                disconnection.endDate,
              )}
            </Alert>
          ))}

        <ContainerWithOutline>
          <Reason
            value={values.taskReasonOrderNumber}
            setFieldValue={setFieldValue}
            handleSelectTaskReason={handleSelectTaskReason}
            handleSearchExecutor={handleSearchExecutor}
            setReasonOpen={setReasonOpen}
            isNoAdditionalFieldsRequired={isNoAdditionalFieldsRequired}
            isOnlySourceNumberRequired={isOnlySourceNumberRequired}
            isOnlySubscriberRequired={isOnlySubscriberRequired}
            isSubscriberAndSourceNumberRequired={
              isSubscriberAndSourceNumberRequired
            }
            isReasonOpen={isReasonOpen}
            dataKey={dataKey}
            handleClosePhoneNumber={handleClosePhoneNumber}
            searchValue={values.taskReasonSearch}
            taskReasons={taskReasons}
          />

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
                  executorId: null,
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
              onMouseDown={() => setTaskTypeOpen(true)}
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
            />
          </FormItem>

          <FormItem label="Срок выполнения">
            <GridContainerAsymmetricThreeColumn>
              <DatePicker
                data-reading-input={dataKey}
                preserveInvalidOnBlur={true}
                allowClear
                open={isDatePickerOpen}
                format={{ format: 'DD.MM.YYYY', type: 'mask' }}
                onFocus={() => {
                  setDatePickerOpen(true);
                }}
                onMouseDown={() => {
                  setDatePickerOpen(!isDatePickerOpen);
                  setFieldValue('taskDeadlineDate', null);
                }}
                value={values.taskDeadlineDate}
                onChange={(value) => {
                  if (value) {
                    setFieldValue('taskDeadlineDate', value);
                  }
                  setDatePickerOpen(false);

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
                onKeyDown={(e) =>
                  fromEnter(() => {
                    setFieldValue('taskDeadlineDate', dayjs());
                    setDatePickerOpen(false);

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
                  })(e as React.KeyboardEvent<HTMLInputElement>)
                }
              />
              <TimePickerMedium
                needConfirm={true}
                showNow={false}
                data-reading-input={dataKey}
                value={values.taskDeadlineTime || undefined}
                onChange={(value) => {
                  setFieldValue('taskDeadlineTime', value);
                }}
                onSelectCapture={(value) => {
                  setFieldValue('taskDeadlineTime', value);
                }}
                onMouseDown={() => {
                  setFieldValue('taskDeadlineTime', null);
                }}
                onKeyDown={(event) => {
                  const target = event.currentTarget as HTMLInputElement;
                  if (event.key !== 'Backspace' && target.value.length === 2) {
                    target.value = target.value + ':';
                  }

                  fromEnter(() => {
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
                  })(event as React.KeyboardEvent<HTMLInputElement>);
                }}
                onOk={() => {
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
