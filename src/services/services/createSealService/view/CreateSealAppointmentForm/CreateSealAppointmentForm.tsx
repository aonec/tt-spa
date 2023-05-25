import React, { FC, useMemo } from 'react';
import { CreateSealAppointmentFormProps } from './CreateSealAppointmentForm.types';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { GroupWrapper } from './CreateSealAppointmentForm.styled';
import { Select } from 'ui-kit/Select';
import { Form } from 'antd';
import _ from 'lodash';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import { DatePicker } from 'ui-kit/DatePicker';

export const CreateSealAppointmentForm: FC<CreateSealAppointmentFormProps> = ({
  formId,
  handleCreateAppointment,
  apartment,
}) => {
  const mainHomeowner = useMemo(
    () =>
      (apartment.homeownerAccounts || []).find(
        (homeowner) => homeowner.isMainPersonalAccountNumber,
      ) || _.last(apartment.homeownerAccounts),
    [apartment],
  );

  const { values, setFieldValue, submitForm } = useFormik({
    initialValues: {
      sealNumbers: undefined,
      id: mainHomeowner?.id || undefined,
      phoneNumber: mainHomeowner?.phoneNumber || undefined,
      date: '',
    },
    onSubmit: handleCreateAppointment,
  });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <FormItem label="Адрес">
        <Input
          value={getApartmentAddressString(apartment, true) || undefined}
          disabled
        />
      </FormItem>
      <GroupWrapper>
        <FormItem label="ФИО">
          <Select
            placeholder="Выберите"
            value={values.id || undefined}
            onChange={(homeowner) => setFieldValue('name', homeowner)}
          >
            {(apartment.homeownerAccounts || []).map((homeowner) => (
              <Select.Option key={homeowner.id} value={homeowner.id}>
                {homeowner.name}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Телефон">
          <Input
            placeholder="Введите"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
          />
        </FormItem>
      </GroupWrapper>
      <GroupWrapper>
        <FormItem label="Дата записи на опломбировку">
          <DatePicker
            format="DD.MM.YYYY"
            value={getDatePickerValue(values.date)}
            onChange={(date) =>
              setFieldValue('date', date?.format('YYYY-MM-DD'))
            }
          />
        </FormItem>
        <FormItem label="Количество пломб">
          <Input
            type="number"
            placeholder="Введите"
            value={values.sealNumbers}
            onChange={(e) => setFieldValue('sealNumbers', e.target.value)}
          />
        </FormItem>
      </GroupWrapper>
      <FormItem label="Комментарий">
        <Input placeholder="Добавьте свой комментарий" />
      </FormItem>
    </Form>
  );
};
