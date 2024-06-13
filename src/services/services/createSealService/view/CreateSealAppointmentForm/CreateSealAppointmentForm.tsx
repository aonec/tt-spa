import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  AppointmentCreateFormik,
  CreateSealAppointmentFormProps,
} from './CreateSealAppointmentForm.types';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import {
  CounterWrapper,
  GroupWrapper,
  SkeletonSC,
  Circle,
} from './CreateSealAppointmentForm.styled';
import { Select } from 'ui-kit/Select';
import { Form } from 'antd';
import _ from 'lodash';
import { getDatePickerValue } from 'utils/getDatePickerValue';
import {
  appointmentsText,
  validationSchema,
} from './CreateSealAppointmentForm.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import dayjs from 'api/dayjs';
import { getCountText } from 'utils/getCountText';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { DatePicker } from 'ui-kit/DatePicker';
import { Dayjs } from 'dayjs';

export const CreateSealAppointmentForm: FC<CreateSealAppointmentFormProps> = ({
  formId,
  handleWorkWithAppointment,
  apartment,
  appointment,
  setMonth,
  appointmentsOnMonthData,
  appointmentsOnMonthLoading,
  districtId,
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
        homeownerFullName:
          appointment?.homeownerFullName || mainHomeowner?.name || undefined,
        homeownerPhone:
          appointment?.homeownerPhone ||
          _.first(mainHomeowner?.phoneNumbers || []) ||
          undefined,
        comment: appointment?.comment || undefined,
        date: appointment?.date || undefined,
        sealCountPlan: appointment?.sealCountPlan || undefined,
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
        handleWorkWithAppointment({
          ...values,
          date,
          sealCountPlan,
          homeownerPhone,
          homeownerFullName,
        });
      },
    });

  const handlePanelChange = useCallback(
    (day: dayjs.Dayjs) => {
      setMonth(day.startOf('month').format('YYYY-MM-DD'));
    },
    [setMonth],
  );

  const date = useMemo(() => getDatePickerValue(values.date), [values]);

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
            disabledDate={(date) => dayjs().diff(date, 'd') > 0}
            value={date}
            onChange={(date) =>
              setFieldValue('date', date?.format('YYYY-MM-DD'))
            }
            onPanelChange={handlePanelChange}
            renderExtraFooter={() => {
              if (appointmentsOnMonthLoading) {
                return <SkeletonSC active />;
              }

              if (values.date && districtId) {
                return (
                  <CounterWrapper>
                    Записи на эту дату:{' '}
                    {appointmentsOnMonthData?.[values.date] || 0}
                  </CounterWrapper>
                );
              }
              return null;
            }}
            showToday={false}
            allowClear={false}
            cellRender={(day, info) => {
              const formatedDay = (day as Dayjs).format('YYYY-MM-DD');
              if (
                info.today.diff(day, 'day') <= 0 &&
                info.type === 'date' &&
                appointmentsOnMonthData[formatedDay]
              ) {
                return (
                  <Tooltip
                    title={`${formatedDay} (${
                      appointmentsOnMonthData[formatedDay]
                    } ${getCountText(
                      appointmentsOnMonthData[formatedDay],
                      appointmentsText,
                    )})`}
                  >
                    <div className="ant-picker-cell-inner" title="">
                      {(day as dayjs.Dayjs).format('DD')}
                    </div>
                    <Circle />
                  </Tooltip>
                );
              }
              return (
                <Tooltip title={`${formatedDay}`}>
                  <div className="ant-picker-cell-inner" title="">
                    {(day as Dayjs).format('DD')}
                  </div>
                </Tooltip>
              );
            }}
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
