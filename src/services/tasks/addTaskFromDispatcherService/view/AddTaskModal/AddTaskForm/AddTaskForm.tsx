import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
  AutoComplete as AutoCompleteAntD,
  Form,
  Button as ButtonAntD,
} from 'antd';
import * as yup from 'yup';
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
  TaskTypesWrapper,
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
  ErpTaskReasonResponse,
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

const {
  gates: { PageGate },
} = addTaskFromDispatcherService;

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
      taskType: EisTaskType.Planned,
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
    // enableReinitialize: true,
    validateOnBlur: true,
    validateOnMount: true,

    validationSchema: yup.object().shape({
      sourceId: yup.string().nullable().required('Обязательное поле'),
      requestNumber: yup.string().nullable().required('Обязательное поле'),
      subscriberName: yup.string().nullable().required('Обязательное поле'),
      phoneNumber: yup.string().nullable().required('Обязательное поле'),
      requestDate: yup.string().nullable().required('Обязательное поле'),
      requestTime: yup.string().nullable().required('Обязательное поле'),
      executorId: yup.string().nullable().required('Обязательное поле'),
      leadId: yup.string().nullable().required('Обязательное поле'),
      selectedObjectAddress: yup
        .string()
        .nullable()
        .required('Обязательное поле'),
    }),
    onSubmit: (data) => {
      handleCreateTask(data);
    },
  });

  const sortedLeadExecutors = useMemo(() => {
    return sortByAlphabet(leadExecutors);
  }, [leadExecutors]);

  const sortedExecutors = useMemo(() => {
    return sortByAlphabet(executors);
  }, [executors]);

  const isHaveValidationErrors = useMemo(
    () => Boolean(Object.keys(errors).length),
    [errors],
  );

  useEffect(() => {
    setDisableSubmit(isHaveValidationErrors);
  }, [isHaveValidationErrors, setDisableSubmit]);

  const preparedAddressOptions = preparedAddressOption(
    values.addressSearch,
    preparedForOptionsAddresses || [],
  );

  const getTaskReasonOptions = useCallback(
    (taskReasons: ErpTaskReasonResponse[]) =>
      taskReasons.map((taskReason, index) => {
        return {
          label: (
            <OptionItemWrapper>
              <TopWrapper
                onClick={() => {
                  setFieldValue('taskType', EisTaskType.Planned);
                }}
              >
                <ResourseTypeWrapper>
                  {TaskReasonTypeDictionary[taskReason.reasonType]}
                </ResourseTypeWrapper>
                <ArrowRightLongIconDim />
                <WorkTitleWrapper>
                  <WorkTitle>{taskReason.name}</WorkTitle>
                </WorkTitleWrapper>
              </TopWrapper>
              <TaskTypesWrapper>
                {taskReason.allowedTaskTypes?.map((taskType) => (
                  <ButtonAntD
                    size="small"
                    onClick={() => {
                      setFieldValue('taskType', taskType);
                    }}
                    danger={taskType === EisTaskType.Emergency}
                  >
                    {TaskTypeDictionary[taskType]}
                  </ButtonAntD>
                ))}
              </TaskTypesWrapper>
            </OptionItemWrapper>
          ),
          value: taskReason.name,
          key: `${taskReason.id}${index}`,
        };
      }),
    [setFieldValue],
  );

  const taskReasonOptions = getTaskReasonOptions(taskReasons);

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

  const apartNumberOptions = autocompleteApartNumber(
    values.apartmentNumber,
    existingApartmentNumbers,
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
            />
          </FormItem>

          <FormItem label="Номер заявки">
            <Input
              placeholder="Введите"
              value={values.requestNumber || undefined}
              onChange={(value) =>
                setFieldValue('requestNumber', value.target.value)
              }
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
              status={
                values.taskType === EisTaskType.Emergency
                  ? 'error'
                  : values.taskType === EisTaskType.Current
                  ? 'warning'
                  : ''
              }
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
            />
          </FormItem>
        </ContainerWithOutline>

        <GridContainer>
          <FormItem label="Ответственный исполнитель">
            <Select
              showSearch
              optionFilterProp="label"
              optionLabelProp="label"
              placeholder="Выберите из списка"
              value={values.leadId || undefined}
              onSelect={(value) => {
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
