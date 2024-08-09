import React, { FC } from 'react';
import { GridContainer } from './CheckHousingMeteringDeviceForm.styled';
import {
  CheckHousingMeteringDeviceFormProps,
  CheckHousingMeteringDeviceFormTypes,
} from './CheckHousingMeteringDeviceForm.types';
import { useFormik } from 'formik';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import dayjs from 'api/dayjs';
import * as yup from 'yup';
import { CheckDeviceRequest } from 'api/types';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import { Form } from 'antd';
import { checkingDateTest } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.utils';

export const CheckHousingMeteringDeviceForm: FC<
  CheckHousingMeteringDeviceFormProps
> = ({ deviceId, formId, handleOnSubmit }) => {
  const { handleSubmit, values, errors, setFieldValue } =
    useFormik<CheckHousingMeteringDeviceFormTypes>({
      validateOnChange: false,
      initialValues: {
        deviceId: deviceId,
        lastCheckingDate: null,
        futureCheckingDate: null,
      },
      validationSchema: yup.object({
        deviceId: yup.number().required('Не передан идентификатор устройства'),
        lastCheckingDate: yup
          .string()
          .nullable()
          .test('checking-date-down', 'некорректная дата', checkingDateTest)
          .required('Обязательное поле'),
        futureCheckingDate: yup
          .string()
          .nullable()
          .test('checking-date-down', 'некорректная дата', checkingDateTest)
          .required('Обязательное поле'),
      }),
      onSubmit: () => {
        if (values.lastCheckingDate && values.futureCheckingDate) {
          const form: CheckDeviceRequest = {
            deviceId: values.deviceId,
            currentCheckingDate: values.lastCheckingDate.format(),
            futureCheckingDate: values.futureCheckingDate.format(),
          };
          handleOnSubmit(form);
        }
      },
    });
  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GridContainer>
        <FormItem label="Дата последней поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue(
                'futureCheckingDate',
                date ? dayjs(date).add(4, 'year') : '',
              );
            }}
            placeholder="Выберите"
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
          <ErrorMessage> {errors.lastCheckingDate} </ErrorMessage>
        </FormItem>

        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={values.futureCheckingDate}
            onChange={(date) => setFieldValue('futureCheckingDate', date)}
            placeholder="Выберите"
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
          <ErrorMessage> {errors.futureCheckingDate} </ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
