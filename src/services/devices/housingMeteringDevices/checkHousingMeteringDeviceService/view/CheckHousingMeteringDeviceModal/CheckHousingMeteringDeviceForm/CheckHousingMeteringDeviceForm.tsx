import React, { FC } from 'react';
import { GridContainer } from './CheckHousingMeteringDeviceForm.styled';
import {
  CheckHousingMeteringDeviceFormProps,
  CheckHousingMeteringDeviceFormTypes,
} from './CheckHousingMeteringDeviceForm.types';
import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { CheckDeviceRequest } from 'myApi';
import { FormItem } from 'ui-kit/FormItem';
import { DatePicker } from 'ui-kit/DatePicker';
import { Form } from 'antd';

export const CheckHousingMeteringDeviceForm: FC<CheckHousingMeteringDeviceFormProps> = ({
  deviceId,
  formId,
  handleOnSubmit,
}) => {
  const {
    handleSubmit,
    values,
    errors,
    setFieldValue,
  } = useFormik<CheckHousingMeteringDeviceFormTypes>({
    initialValues: {
      deviceId: deviceId,
      lastCheckingDate: null,
      futureCheckingDate: null,
    },
    validationSchema: yup.object({
      deviceId: yup.number().required('Не передан Идентификатор устройства'),
      lastCheckingDate: yup.string().required('Обязательное поле'),
      futureCheckingDate: yup.string().required('Обязательное поле'),
    }),
    onSubmit: () => {
      if (values.lastCheckingDate && values.futureCheckingDate) {
        const form: CheckDeviceRequest = {
          deviceId: values.deviceId,
          currentCheckingDate: values.lastCheckingDate.toISOString(true),
          futureCheckingDate: values.futureCheckingDate.toISOString(true),
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
                date ? moment(date).add(4, 'year') : ''
              );
            }}
            placeholder="Выберите"
            format="DD.MM.YYYY"
          />
        </FormItem>

        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={values.futureCheckingDate}
            onChange={(date) => setFieldValue('futureCheckingDate', date)}
            placeholder="Выберите"
            format="DD.MM.YYYY"
          />
        </FormItem>
      </GridContainer>
    </Form>
  );
};
