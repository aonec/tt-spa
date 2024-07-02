import { Form } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { CheckCalculatorFormik } from '../../checkCalculatorService.types';
import { CheckCalculatorFormProps } from './CheckCalculatorForm.types';
import { Wrapper } from './CheckCalculatorForm.styled';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import * as yup from 'yup';
import { checkingDateTest } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.utils';

export const CheckCalculatorForm: FC<CheckCalculatorFormProps> = ({
  formId,
  handleCheckCalculator,
}) => {
  const { values, setFieldValue, submitForm, errors } =
    useFormik<CheckCalculatorFormik>({
      initialValues: {
        currentCheckingDate: dayjs().format(),
        futureCheckingDate: dayjs().add(4, 'year').format(),
      },
      validationSchema: yup.object().shape({
        currentCheckingDate: yup
          .string()
          .test('checking-date-down', 'некорректная дата', checkingDateTest)
          .required('Это поле обязательно'),
        futureCheckingDate: yup
          .string()
          .test('checking-date-down', 'некорректная дата', checkingDateTest)
          .required('Это поле обязательно'),
      }),
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit: handleCheckCalculator,
    });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <Wrapper>
        <FormItem label="Дата последней поверки прибора">
          <DatePicker
            value={dayjs(values.currentCheckingDate)}
            onChange={(date) => {
              if (!date) {
                return;
              }
              setFieldValue('currentCheckingDate', date.format());
              setFieldValue('futureCheckingDate', date.add(4, 'year').format());
            }}
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
          <ErrorMessage>{errors.currentCheckingDate}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={dayjs(values.futureCheckingDate)}
            onChange={(date) => {
              if (!date) {
                return;
              }
              setFieldValue('futureCheckingDate', date.format());
            }}
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
          <ErrorMessage>{errors.futureCheckingDate}</ErrorMessage>
        </FormItem>
      </Wrapper>
    </Form>
  );
};
