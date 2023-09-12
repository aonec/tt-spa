import React, { FC, useEffect, useMemo } from 'react';
import { AutoComplete as AutoCompleteAntD } from 'antd';
import {
  ArrowRightLongIconDim,
  ChevronIconDown,
  ContainerWithOutline,
  GridContainer,
  GridContainerAsymmetricLeft,
  GridContainerAsymmetricRight,
  OptionItemWrapper,
  ResourseTypeWrapper,
  SearchIconSc,
  TextareaSC,
  TopWrapper,
  WorkTitle,
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
import { EisTaskType } from 'api/types';
import { SelectTime } from 'ui-kit/SelectTime';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.models';
import { TaskTypeDictionary } from 'dictionaries';
import { autocompleteAddress, sortByAlphabet } from './AddTaskForm.utils';
import { SearchIcon } from 'ui-kit/icons';
import { AutoComplete } from 'ui-kit/AutoComplete';

const {
  gates: { PageGate },
} = addTaskFromDispatcherService;

export const AddTaskForm: FC<AddTaskFormProps> = ({
  formId,
  ERPSources,
  workCategories: workTypes,
  ErpObjects,
  handleCreateTask,
  setDisableSubmit,
  choоseLeadExecutor,
  executors,
  handleTaskDeadlineRequest,
  taskDeadline,
  leadExecutors,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<AddTask>({
    initialValues: {
      sourceId: null,
      requestNumber: null,
      taskType: null as null | EisTaskType,
      workTypeId: null,

      requestDate: null,
      requestTime: null,

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

      petitionId: null,
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnMount: true,

    validationSchema: yup.object().shape({
      sourceId: yup.string().nullable().required('Обязательное поле'),
      requestNumber: yup.string().nullable().required('Обязательное поле'),
      taskType: yup.string().nullable().required('Обязательное поле'),
      workTypeId: yup.string().nullable().required('Обязательное поле'),
      subscriberName: yup.string().nullable().required('Обязательное поле'),
      phoneNumber: yup.string().nullable().required('Обязательное поле'),
      requestDate: yup.string().nullable().required('Обязательное поле'),
      requestTime: yup.string().nullable().required('Обязательное поле'),
      taskDeadline: yup
        .string()
        .nullable()
        .required('Обязательное поле')
        .when('isPermittedToChangeDeadline', {
          is: true,
          then: yup.string().nullable(),
        }),
      manualDeadlineDate: yup
        .string()
        .nullable()
        .when('isPermittedToChangeDeadline', {
          is: true,
          then: yup.string().required('Это поле обязательно'),
        }),

      manualDeadlineTime: yup
        .string()
        .nullable()
        .when('isPermittedToChangeDeadline', {
          is: true,
          then: yup.string().required('Это поле обязательно'),
        }),
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

  useEffect(() => {
    const isPermitted =
      workTypes.find((workType) => workType.id === values.workTypeId)
        ?.isDeadlineChangingPermitted || false;

    setFieldValue('isPermittedToChangeDeadline', isPermitted);
  }, [values.workTypeId, setFieldValue, workTypes]);

  const calculatedDeadlineDateArr = useMemo(() => {
    if (!taskDeadline || !values.requestDate || !values.requestTime)
      return null;

    if (values.isPermittedToChangeDeadline) return null;

    const sourceDateTime = dayjs(
      values.requestDate
        .format('YYYY-MM-DD')
        .concat('T', values.requestTime || ''),
    );

    const deadlineDate = sourceDateTime.add(
      taskDeadline.deadlineInHours,
      'hours',
    );

    const deadlineDateFormatted = deadlineDate.format('YYYY-MM-DDTHH:mm');
    setFieldValue('taskDeadline', deadlineDateFormatted);

    const dateArr = deadlineDateFormatted.split('T');

    return dateArr;
  }, [
    taskDeadline,
    values.requestDate,
    values.requestTime,
    values.isPermittedToChangeDeadline,
    setFieldValue,
  ]);

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

  return (
    <>
      <PageGate />

      <Form id={formId} onSubmitCapture={handleSubmit}>
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

        <FormItem label="Тип заявки">
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
        </FormItem>

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

        <ContainerWithOutline>
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
        </ContainerWithOutline>

        <ContainerWithOutline>
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
            </FormItem>

            <FormItem label="Нормативный срок">
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
            </FormItem>
          </GridContainer>
        </ContainerWithOutline>

        <GridContainer>
          <FormItem label="Адрес">
            <AutoComplete
              placeholder="Улица"
              value={values.addressSearch}
              onChange={(value) => setFieldValue('addressSearch', value)}
              onSelect={(value) =>
                setFieldValue('selectedObjectAddress', value)
              }
              options={preparedErpObjects}
            />
          </FormItem>

          <GridContainerAsymmetricRight>
            {/* <FormItem label="Номер квартиры">
              <Input
                placeholder="Введите"
                value={values.apartmentNumber || undefined}
                onChange={(value) =>
                  setFieldValue('apartmentNumber', value.target.value)
                }
              />
            </FormItem> */}

            {/* <FormItem label="УК">
              <Input placeholder="???" disabled />
            </FormItem> */}
          </GridContainerAsymmetricRight>
        </GridContainer>

        <ContainerWithOutline>
          <GridContainer>
            <FormItem label="ФИО абонента">
              <Input
                placeholder="Введите"
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
        </ContainerWithOutline>

        <>
          <FormItem label="Причина обращения">
            <AutoCompleteAntD
              value={values.petitionId}
              onChange={(value) => setFieldValue('petitionId', value)}
              allowClear
              options={[
                {
                  label: (
                    <OptionItemWrapper>
                      <TopWrapper>
                        <ResourseTypeWrapper>Электричество</ResourseTypeWrapper>
                        <ArrowRightLongIconDim />
                        <WorkTitle>
                          Отсутствие света в подъезде в домах коридорного типа
                        </WorkTitle>
                      </TopWrapper>
                      <WorkType>Восстановление 1 светоточки</WorkType>
                    </OptionItemWrapper>
                  ),
                  value: 'Отсутствие света в подъезде в домах коридорного типа',
                  id: 'id1',
                },
                {
                  label: (
                    <OptionItemWrapper>
                      <TopWrapper>
                        <ResourseTypeWrapper>ХВС</ResourseTypeWrapper>
                        <ArrowRightLongIconDim />
                        <WorkTitle>Отсутствие ХВС</WorkTitle>
                      </TopWrapper>
                      <WorkType>
                        Ревизия узла учета горячего и холодного водоснабжения
                      </WorkType>
                    </OptionItemWrapper>
                  ),
                  value: 'Отсутствие ХВС',
                  id: 'id2',
                },
                {
                  label: (
                    <OptionItemWrapper>
                      <TopWrapper>
                        <ResourseTypeWrapper>ГВС</ResourseTypeWrapper>
                        <ArrowRightLongIconDim />
                        <WorkTitle>Отсутствие ГВС</WorkTitle>
                      </TopWrapper>
                      <WorkType>
                        Ревизия узла учета горячего и холодного водоснабжения
                      </WorkType>
                    </OptionItemWrapper>
                  ),
                  value: 'Отсутствие ГВС',
                  id: 'id3',
                },
              ]}
            >
              <Input prefix={<SearchIconSc />} suffix={<ChevronIconDown />} />
            </AutoCompleteAntD>
          </FormItem>
        </>

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
