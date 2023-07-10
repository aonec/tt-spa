import React, { FC } from 'react';
import {
  ContainerWithOutline,
  GridContainer,
  GridContainerAsymmetricLeft,
  GridContainerAsymmetricRight,
  TextareaSC,
} from './AddTaskForm.styled';
import { AddTaskFormProps } from './AddTaskForm.types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { EisTaskType } from 'myApi';
import { SelectTime } from 'ui-kit/SelectTime';
import { addTaskFromDispatcherService } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.models';
import { TaskTypeDictionary } from 'dictionaries';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { getPreparedStreetsOptions } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectAddressStage/CreateObjectAddressStage.utils';

const {
  gates: { PageGate },
} = addTaskFromDispatcherService;

export const AddTaskForm: FC<AddTaskFormProps> = ({
  formId,
  ERPSources,
  workCategories: workTypes,
  ErpObjects,
}) => {
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      sourceId: null,
      requestNumber: null,
      taskType: null as null | EisTaskType,
      categoryId: null as null | string,
      workTypeId: null,

      requestDate: null,
      requestTime: null,

      addressSearch: '',
      apartmentNumber: null,
      subscriberName: null,
      phoneNumber: null,

      leadId: null,
      executorId: null,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validationSchema: yup.object().shape({
      sourceId: yup.string().nullable().required('Обязательное поле'),
      requestNumber: yup.string().nullable().required('Обязательное поле'),
      taskType: yup.string().nullable().required('Обязательное поле'),
      // categoryId: yup.string().nullable().required('Обязательное поле'),
      workTypeId: yup.string().nullable().required('Обязательное поле'),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });

  const ErpObjectsString = ErpObjects.map((object) => object.address).filter(
    Boolean,
  ) as string[];

  const preparedErpObjects = getPreparedStreetsOptions(
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
        <GridContainer>
          <FormItem label="Тип заявки">
            <Select
              placeholder="Выберите из списка"
              value={values.taskType || undefined}
              onChange={(value) => setFieldValue('taskType', value)}
            >
              {Object.values(EisTaskType).map((e) => (
                <Select.Option value={e} key={e}>
                  {TaskTypeDictionary[e]}
                </Select.Option>
              ))}
            </Select>
          </FormItem>

          <FormItem label="Категория">
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
            </Select>
          </FormItem>
        </GridContainer>

        <ContainerWithOutline>
          <FormItem label="Вид работ">
            <Select
              placeholder="Выберите из списка"
              value={values.workTypeId || undefined}
              onChange={(value) => setFieldValue('workTypeId', value)}
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
                <DatePicker disabled />

                <Select
                  placeholder="Время"
                  // value={values.isThermalChamber || undefined}
                  onChange={(value) => setFieldValue('isThermalChamber', value)}
                >
                  {/* {Object.values(HeatingStationType).map((e) => (
              <Select.Option value={e} key={e}>
                {HeatingStationTypeDictionary[e]}
              </Select.Option>
            ))} */}
                </Select>
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
              options={preparedErpObjects}
            />
          </FormItem>

          <GridContainerAsymmetricRight>
            <FormItem label="Номер квартиры">
              <Input
                placeholder="Введите"
                value={values.apartmentNumber || undefined}
                onChange={(value) =>
                  setFieldValue('apartmentNumber', value.target.value)
                }
              />
            </FormItem>

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
              placeholder="Время"
              // value={values.isThermalChamber || undefined}
              onChange={(value) => setFieldValue('isThermalChamber', value)}
            >
              {/* {Object.values(HeatingStationType).map((e) => (
              <Select.Option value={e} key={e}>
                {HeatingStationTypeDictionary[e]}
              </Select.Option>
            ))} */}
            </Select>
          </FormItem>
          <FormItem label="Исполнитель">
            <Select
              placeholder="Время"
              // value={values.isThermalChamber || undefined}
              onChange={(value) => setFieldValue('isThermalChamber', value)}
            >
              {/* {Object.values(HeatingStationType).map((e) => (
              <Select.Option value={e} key={e}>
                {HeatingStationTypeDictionary[e]}
              </Select.Option>
            ))} */}
            </Select>
          </FormItem>
        </GridContainer>

        <FormItem label="Описание проблемы">
          <TextareaSC placeholder="Кратко опишите проблему" />
        </FormItem>
      </Form>
    </>
  );
};
