import React, { FC, useEffect, useMemo } from 'react';
import {
  ContainerWithOutline,
  GridContainer,
  GridContainerAsymmetricLeft,
  GridContainerAsymmetricRight,
  TextareaSC,
} from './AddTaskForm.styled';
import { AddTask, AddTaskFormProps } from './AddTaskForm.types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { EisTaskType, SourceGrpcModel } from 'myApi';
import { SelectTime } from 'ui-kit/SelectTime';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.models';
import { TaskTypeDictionary } from 'dictionaries';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { autocompleteAddress } from './AddTaskForm.utils';
import moment from 'moment';

const {
  gates: { PageGate },
} = addTaskFromDispatcherService;

export const AddTaskForm: FC<AddTaskFormProps> = ({
  formId,
  ERPSources,
  leadExecutors,
  workCategories: workTypes,
  ErpObjects,
  handleCreateTask,
  setDisableSubmit,
  choоseLeadExecutor,
  executors,
  handleTaskDeadlineRequest,
  taskDeadline,
}) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik<AddTask>({
    initialValues: {
      sourceId: null,
      requestNumber: null,
      taskType: null as null | EisTaskType,
      // categoryId: null as null | string,
      workTypeId: null,

      requestDate: null,
      requestTime: null,

      addressSearch: '',
      selectedObjectAddress: null,

      apartmentNumber: null,
      subscriberName: null,
      phoneNumber: null,

      leadId: null,
      executorId: null,

      taskDescription: null,
    },
    enableReinitialize: true,
    // validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    validationSchema: yup.object().shape({
      sourceId: yup.string().nullable().required('Обязательное поле'),
      requestNumber: yup.string().nullable().required('Обязательное поле'),
      taskType: yup.string().nullable().required('Обязательное поле'),
      // categoryId: yup.string().nullable().required('Обязательное поле'),
      workTypeId: yup.string().nullable().required('Обязательное поле'),
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

  const calculatedDeadlineDateArr = useMemo(() => {
    if (!taskDeadline || !values.requestDate || !values.requestTime)
      return null;

    const sourceDateTime = moment(
      values.requestDate
        .format('YYYY-MM-DD')
        .concat('T', values.requestTime || ''),
    );

    const deadlineDate = sourceDateTime.add(
      taskDeadline.deadlineInHours,
      'hours',
    );

    const deadlineDateFormatted = deadlineDate.format('YYYY-MM-DDTHH:mm');

    const dateArr = deadlineDateFormatted.split('T');

    return dateArr;
  }, [taskDeadline, values.requestDate, values.requestTime]);

  const isHaveValidationErrors = useMemo(
    () => Boolean(Object.keys(errors).length),
    [errors],
  );

  useEffect(() => {
    setDisableSubmit(isHaveValidationErrors);
  }, [isHaveValidationErrors]);

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
              {ERPSources.map((source, index) => (
                <Select.Option
                  value={source.id || index}
                  key={source.id || index}
                >
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
              handleTaskDeadlineRequest({ taskType: value as EisTaskType });
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
                handleTaskDeadlineRequest({ workCategoryId: value as string });
              }}
            >
              {workTypes.map((workType, index) => (
                <Select.Option
                  value={workType.id || index}
                  key={workType.id || index}
                >
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

            <FormItem label="УК">
              <Input placeholder="???" disabled />
            </FormItem>
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
              {leadExecutors.map((leadExecutor, index) => (
                <Select.Option
                  value={leadExecutor.id || index}
                  key={leadExecutor.id || index}
                >
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
              {executors.map((executor, index) => (
                <Select.Option
                  value={executor.id || index}
                  key={executor.id || index}
                >
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
