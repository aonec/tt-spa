import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { AutoComplete as AutoCompleteAntD } from 'antd';
import { capitalize } from 'lodash';
import {
  Address,
  ArrowRightLongIconDim,
  ContainerWithOutline,
  Fullname,
  FullnameWrapper,
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
  WorkTitleColored,
  WorkTitleWrapper,
  WorkType,
} from './AddTaskForm.styled';
import { AddTask, AddTaskFormProps } from './AddTaskForm.types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'api/dayjs';
import { Form } from 'antd';
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
import { ResourceShortNamesDictionary } from 'dictionaries';
import {
  autocompleteAddress,
  autocompleteApartNumber,
  autocompleteTaskReason,
  sortByAlphabet,
} from './AddTaskForm.utils';
import {
  SubscriberType,
  TaskReasonType,
  subscriberData,
  taskReasonData,
} from './AddTaskForm.constants';
import { Alert } from 'ui-kit/Alert';
import { LinkButton } from 'ui-kit/shared/LinkButton';

const {
  gates: { PageGate },
} = addTaskFromDispatcherService;

export const AddTaskForm: FC<AddTaskFormProps> = ({
  formId,
  ERPSources,
  ErpObjects,
  handleCreateTask,
  setDisableSubmit,
  choоseLeadExecutor,
  executors,
  leadExecutors,
  handleSelectHousingAddress,
  existingApartmentNumbers,
  resourceDisconnection,
  handleSelectApartmentNumber,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<AddTask>({
    initialValues: {
      sourceId: null,
      requestNumber: null,
      taskType: null as null | EisTaskType,
      workTypeId: null,

      requestDate: dayjs(),
      requestTime: dayjs().format('HH:00'),

      manualDeadlineDate: null,
      manualDeadlineTime: null,

      taskDeadline: null,

      addressSearch: '',
      selectedObjectAddress: null,

      apartmentNumber: null,
      subscriberName: null,
      phoneNumber: null,

      leadId: null,
      executorId: null,

      taskDescription: null,

      isPermittedToChangeDeadline: false,

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

  const ErpObjectsString = ErpObjects.map((object) => object.address).filter(
    Boolean,
  ) as string[];

  const preparedErpObjects = autocompleteAddress(
    values.addressSearch,
    ErpObjectsString || [],
  );

  const getTaskReasonOptions = useCallback(
    (taskReasons: TaskReasonType, coloredText: string | null) =>
      taskReasons.map((taskReason) => {
        const preparedColoredText = capitalize(coloredText || undefined);
        const residualText = taskReason.name.slice(coloredText?.length);

        return {
          label: (
            <OptionItemWrapper>
              <TopWrapper>
                <ResourseTypeWrapper>
                  {ResourceShortNamesDictionary[taskReason.resourceType]}
                </ResourseTypeWrapper>
                <ArrowRightLongIconDim />
                <WorkTitleWrapper>
                  <WorkTitleColored>{preparedColoredText}</WorkTitleColored>
                  <WorkTitle>{residualText}</WorkTitle>
                </WorkTitleWrapper>
              </TopWrapper>
              <WorkType>{taskReason.nomenclatureName}</WorkType>
            </OptionItemWrapper>
          ),
          value: taskReason.name,
          id: taskReason.id,
        };
      }),
    [],
  );

  const filteredTaskReasonData = useMemo(
    () => autocompleteTaskReason(values.taskReasonSearch, taskReasonData),
    [values.taskReasonSearch],
  );

  const taskReasonOptions = getTaskReasonOptions(
    filteredTaskReasonData,
    values.taskReasonSearch,
  );

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

  const getSubscribersNameOptions = useCallback(
    (subscribersData: SubscriberType) =>
      subscribersData.map((subscriber) => {
        return {
          label: (
            <FullnameWrapper>
              <Fullname>
                {subscriber.lastName} {subscriber.firstName}{' '}
                {subscriber.surname}
              </Fullname>
              <Address>{subscriber.address}</Address>
            </FullnameWrapper>
          ),
          value: `${subscriber.lastName} ${subscriber.firstName} ${subscriber.surname}`,
          id: subscriber.id,
        };
      }),
    [],
  );

  const apartNumberOptions = autocompleteApartNumber(
    values.apartmentNumber,
    existingApartmentNumbers,
  );

  const apartId = useMemo(() => {
    if (!values.apartmentNumber) return null;
    const selectedOption = apartNumberOptions.find(
      (apartNumberOption) => apartNumberOption.value === values.apartmentNumber,
    );
    return selectedOption?.id || null;
  }, [apartNumberOptions, values.apartmentNumber]);

  // const subscribersNameOptions = getSubscribersNameOptions(subscriberData);

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
              }}
              options={preparedErpObjects}
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
            <Input
              // prefix={<SearchIconSc />}
              placeholder="Начните вводить"
              value={values.subscriberName || undefined}
              onChange={(value) =>
                setFieldValue('subscriberName', value.target.value)
              }
            />
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
            <AutoCompleteAntD
              value={values.taskReasonSearch}
              onChange={(value) => setFieldValue('taskReasonSearch', value)}
              allowClear
              options={taskReasonOptions}
            >
              <Input prefix={<SearchIconSc />} placeholder="Начните вводить" />
            </AutoCompleteAntD>
          </FormItem>

          <LinkButton onClick={() => {}}>+ Добавить обращение</LinkButton>
        </ContainerWithOutline>

        <GridContainer>
          <FormItem label="Ответственный исполнитель">
            <Select
              placeholder="Выберите из списка"
              value={values.leadId || undefined}
              onChange={(value) => {
                setFieldValue('leadId', value);
                choоseLeadExecutor(value as string);
              }}
            >
              {sortedLeadExecutors.map((leadExecutor) => (
                <Select.Option value={leadExecutor.id} key={leadExecutor.id}>
                  {leadExecutor.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Исполнитель">
            <Select
              placeholder="Выберите из списка"
              value={values.executorId || undefined}
              onChange={(value) => setFieldValue('executorId', value)}
              disabled={!Boolean(values.leadId)}
            >
              {sortedExecutors.map((executor) => (
                <Select.Option value={executor.id} key={executor.id}>
                  {executor.name}
                </Select.Option>
              ))}
            </Select>
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
