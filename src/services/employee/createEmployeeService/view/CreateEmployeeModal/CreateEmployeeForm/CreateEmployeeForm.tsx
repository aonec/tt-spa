import React, { FC } from 'react';
import { GridContainer, NameGridContainer } from './CreateEmployeeForm.styled';
import { CreateEmployeeFormProps } from './CreateEmployeeForm.types';
import { Form } from 'antd';
import { FormItem } from 'ui-kit/FormItem';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from 'ui-kit/Input';
import { usePhoneMask } from 'hooks/usePhoneMask';
import { DatePicker } from 'ui-kit/DatePicker';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { SelectMultiple } from 'ui-kit/SelectMultiple';

export const CreateEmployeeForm: FC<CreateEmployeeFormProps> = ({
  formId,
  multipleSelectionCompetences,
  multipleSelectionUserRoles,
  handleCreateEmloyee,
}) => {
  const phoneMask = usePhoneMask();

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: {
      email: null,
      firstName: null,
      lastName: null,
      middleName: null,
      cellphone: '',
      number: null,
      roleTypes: null,
      competenceIds: [],
    },
    onSubmit: (data) => {
      handleCreateEmloyee(data);
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .nullable()
        .min(2, 'Минимум два символа')
        .required('Обязательное поле'),
      lastName: yup
        .string()
        .nullable()
        .min(2, 'Минимум два символа')
        .required('Обязательное поле'),
      email: yup.string().nullable().required('Обязательное поле'),
      roleTypes: yup.array().nullable().required('Обязательное поле'),
    }),
  });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <NameGridContainer>
        <FormItem label="Фамилия">
          <Input
            placeholder="Введите"
            value={values.lastName || undefined}
            onChange={(value) => {
              setFieldValue('lastName', value.target.value);
            }}
          />
          <ErrorMessage>{errors.lastName}</ErrorMessage>
        </FormItem>
        <FormItem label="Имя">
          <Input
            placeholder="Введите"
            value={values.firstName || undefined}
            onChange={(value) => {
              setFieldValue('firstName', value.target.value);
            }}
          />
          <ErrorMessage>{errors.firstName}</ErrorMessage>
        </FormItem>
        <FormItem label="Отчество">
          <Input
            placeholder="Введите"
            value={values.middleName || undefined}
            onChange={(value) => {
              setFieldValue('middleName', value.target.value);
            }}
          />
        </FormItem>
      </NameGridContainer>
      <GridContainer>
        <FormItem label="Электронная почта">
          <Input
            type="email"
            placeholder="Введите"
            value={values.email || undefined}
            onChange={(value) => {
              setFieldValue('email', value.target.value);
            }}
          />
          <ErrorMessage>{errors.email}</ErrorMessage>
        </FormItem>
        <FormItem label="Контактный телефон">
          <Input
            name="cellphone"
            type="tel"
            placeholder="Введите"
            value={
              values.cellphone && values.cellphone.length > 8
                ? phoneMask.maskValue(values.cellphone || '') || undefined
                : values.cellphone || undefined
            }
            onChange={(value) =>
              setFieldValue(
                'cellphone',
                phoneMask.unmaskedValue(value.target.value),
              )
            }
          />
        </FormItem>
      </GridContainer>
      <GridContainer>
        <FormItem label="Роль в системе">
          <SelectMultiple
            placeholder="Выберите"
            onChange={(value) => {
              setFieldValue('roleTypes', value);
            }}
            value={values.roleTypes || undefined}
          >
            {multipleSelectionUserRoles?.map((elem, i) => (
              <SelectMultiple.Option value={elem.value || ''} key={elem.value}>
                {elem.label}
              </SelectMultiple.Option>
            ))}
          </SelectMultiple>
          <ErrorMessage>{errors.roleTypes}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата начала работы">
          <DatePicker
            value={values.number}
            onChange={(date) => setFieldValue('number', date)}
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
        </FormItem>
      </GridContainer>
      <FormItem label="Компетенции">
        <SelectMultiple
          placeholder="Выберите"
          onChange={(value) => setFieldValue('competenceIds', value)}
          value={values.competenceIds || undefined}
        >
          {multipleSelectionCompetences?.map((elem) => (
            <SelectMultiple.Option value={elem.value} key={elem.value}>
              {elem.label}
            </SelectMultiple.Option>
          ))}
        </SelectMultiple>
      </FormItem>
    </Form>
  );
};
