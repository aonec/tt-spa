import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { AutoComplete as AutoCompleteAntD } from 'antd';
import { capitalize } from 'lodash';
import {
  Address,
  ArrowRightLongIconDim,
  ChevronIconDown,
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
import { ExistingTasks } from './ExistingTasks';
import { AutoComplete } from 'ui-kit/AutoComplete';
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

  const subscribersNameOptions = getSubscribersNameOptions(subscriberData);

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
            <Select
              placeholder="Выберите из списка"
              value={values.sourceId || undefined}
              onChange={(value) => setFieldValue('sourceId', value)}
            >
              {ERPSources.map((source) => (
                <Select.Option value={source.id} key={source.id}>
                  {source.name}
                </Select.Option>
              ))}
            </Select>
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
              }}
              options={apartNumberOptions}
            >
              <Input placeholder="Введите" />
            </AutoCompleteAntD>
          </FormItem>
        </GridContainerAsymmetricRight>

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

        {/* <FormItem label="Тип заявки">
          <Select
            placeholder="Выберите из списка"
            value={values.taskType || undefined}
            onChange={(value) => {
              setFieldValue('taskType', value);

              const isPermitted =
                workTypes.find((workType) => workType.id === values.workTypeId)
                  ?.isDeadlineChangingPermitted || false;

              handleTaskDeadlineRequest({
                TaskType: value as EisTaskType,
                isPermittedToRequest: isPermitted,
              });
            }}
          >
            {Object.values(EisTaskType).map((e) => (
              <Select.Option value={e} key={e}>
                {TaskTypeDictionary[e]}
              </Select.Option>
            ))}
          </Select>
        </FormItem> */}

        {/* <FormItem label="Категория">
            <Select
              placeholder="Выберите из списка"
              value={values.categoryId || undefined}
              onChange={(value) => setFieldValue('categoryId', value)}
            >
              {/* {categories.map((category, index) => (
                <Select.Option
                  value={category.id || index}
                  key={category.id || index}
                >
                  {category.name}
                </Select.Option>
              ))} */}
        {/* </Select>
          </FormItem> */}

        {/* <ContainerWithOutline>
          <FormItem label="Вид работ">
            <Select
              placeholder="Выберите из списка"
              value={values.workTypeId || undefined}
              onChange={(value) => {
                setFieldValue('workTypeId', value);

                const isPermitted =
                  workTypes.find(
                    (workType) => workType.id === values.workTypeId,
                  )?.isDeadlineChangingPermitted || false;

                handleTaskDeadlineRequest({
                  WorkCategoryId: value as string,
                  isPermittedToRequest: isPermitted,
                });
              }}
            >
              {workTypes.map((workType) => (
                <Select.Option value={workType.id} key={workType.id}>
                  {workType.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </ContainerWithOutline> */}

        {/* <ContainerWithOutline>
          <GridContainer>
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
            </FormItem> */}

        {/* <FormItem label="Нормативный срок">
              <GridContainerAsymmetricLeft>
                {!values.isPermittedToChangeDeadline ? (
                  <>
                    <Input
                      disabled
                      placeholder="Выберите дату заявки"
                      value={calculatedDeadlineDateArr?.[0]}
                    />
                    <Input
                      disabled
                      placeholder="Время"
                      value={calculatedDeadlineDateArr?.[1]}
                    />
                  </>
                ) : (
                  <>
                    <DatePicker
                      value={values.manualDeadlineDate}
                      onChange={(value) =>
                        setFieldValue('manualDeadlineDate', value)
                      }
                    />

                    <SelectTime
                      value={values.manualDeadlineTime || undefined}
                      onChange={(value) =>
                        setFieldValue('manualDeadlineTime', value)
                      }
                    />
                  </>
                )}
              </GridContainerAsymmetricLeft>
            </FormItem> */}
        {/* </GridContainer>
        </ContainerWithOutline> */}

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
