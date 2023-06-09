import React, { FC, useMemo, useState } from 'react';
import {
  AppointmentCreateFormik,
  CreateSealAppointmentFormProps,
} from './CreateSealAppointmentForm.types';
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
import { validationSchema } from './CreateSealAppointmentForm.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

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

  const [additionalOption, setAdditionalOption] = useState('');

  const { values, setFieldValue, submitForm, errors } =
    useFormik<AppointmentCreateFormik>({
      initialValues: {
        homeownerFullName: mainHomeowner?.name || undefined,
        homeownerPhone: mainHomeowner?.phoneNumber || undefined,
      },
      validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: (values) => {
        const { date, sealCountPlan, homeownerPhone, homeownerFullName } =
          values;

        if (!date || !sealCountPlan || !homeownerPhone || !homeownerFullName) {
          return;
        }
        handleCreateAppointment({
          ...values,
          date,
          sealCountPlan,
          homeownerPhone,
          homeownerFullName,
        });
      },
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
            showSearch
            onSearch={(name) => setAdditionalOption(name)}
            placeholder="Введите"
            value={values.homeownerFullName || undefined}
            onChange={(name) => setFieldValue('homeownerFullName', name)}
          >
            {additionalOption && (
              <Select.Option value={additionalOption}>
                {additionalOption}
              </Select.Option>
            )}
            {(apartment.homeownerAccounts || []).map((homeowner) => {
              if (!homeowner.name) {
                return null;
              }
              return (
                <Select.Option key={homeowner.id} value={homeowner.name}>
                  {homeowner.name}
                </Select.Option>
              );
            })}
          </Select>
          <ErrorMessage>{errors.homeownerFullName}</ErrorMessage>
        </FormItem>
        <FormItem label="Телефон">
          <Input
            placeholder="Введите"
            value={values.homeownerPhone}
            onChange={(e) => setFieldValue('homeownerPhone', e.target.value)}
          />
          <ErrorMessage>{errors.homeownerPhone}</ErrorMessage>
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
          <ErrorMessage>{errors.date}</ErrorMessage>
        </FormItem>
        <FormItem label="Количество пломб">
          <Input
            type="number"
            placeholder="Введите"
            value={values.sealCountPlan || undefined}
            onChange={(e) =>
              setFieldValue('sealCountPlan', Number(e.target.value))
            }
          />
          <ErrorMessage>{errors.sealCountPlan}</ErrorMessage>
        </FormItem>
      </GroupWrapper>
      <FormItem label="Комментарий">
        <Input
          value={values.comment}
          onChange={(e) => setFieldValue('comment', e.target.value)}
          placeholder="Добавьте свой комментарий"
        />
      </FormItem>
    </Form>
  );
};
