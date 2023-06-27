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

export const AddTaskForm: FC<AddTaskFormProps> = ({ formId }) => {
  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      workCategoryId: null as null | string,
      taskType: EisTaskType,
    },
    enableReinitialize: true,
    onSubmit: (data) => {},
    validateOnChange: false,
    validationSchema: yup.object().shape({
      name: yup.string().nullable().required('Обязательное поле'),
      address: yup.object().shape({
        city: yup.string().nullable().required('Обязательное поле'),
        street: yup.string().required('Обязательное поле'),
        number: yup.string().nullable().required('Обязательное поле'),
      }),
    }),
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GridContainer>
        <FormItem label="Источник заявки">
          <Select
            placeholder="Выберите из списка"
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

        <FormItem label="Номер заявки">
          <Input
            placeholder="Введите"
            // value={values.name || undefined}
            onChange={(value) => setFieldValue('name', value.target.value)}
          />
        </FormItem>
      </GridContainer>
      <GridContainer>
        <FormItem label="Тип заявки">
          <Select
            placeholder="Выберите из списка"
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

        <FormItem label="Категория">
          <Select
            placeholder="Выберите из списка"
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

      <ContainerWithOutline>
        <FormItem label="Вид работ">
          <Select
            disabled
            placeholder="Выберите из списка"
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
      </ContainerWithOutline>

      <ContainerWithOutline>
        <GridContainer>
          <FormItem label="Дата заявки">
            <GridContainerAsymmetricLeft>
              <DatePicker />

              <SelectTime />
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
          <Input />
        </FormItem>

        <GridContainerAsymmetricRight>
          <FormItem label="Номер квартиры">
            <Input />
          </FormItem>
          <FormItem label="УК">
            <Input />
          </FormItem>
        </GridContainerAsymmetricRight>
      </GridContainer>

      <ContainerWithOutline>
        <GridContainer>
          <FormItem label="ФИО абонента">
            <Input />
          </FormItem>
          <FormItem label="Номер телефона">
            <Input />
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
  );
};
