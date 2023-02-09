import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { CheckCalculatorFormik } from '../../checkCalculatorService.types';
import { CheckCalculatorFormProps } from './CheckCalculatorForm.types';
import { Wrapper } from './CheckCalculatorForm.styled';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import * as yup from 'yup';

export const CheckCalculatorForm: FC<CheckCalculatorFormProps> = ({
  formId,
  handleCheckCalculator,
}) => {
  const {
    values,
    setFieldValue,
    submitForm,
    errors,
  } = useFormik<CheckCalculatorFormik>({
    initialValues: {
      currentCheckingDate: moment().format(),
      futureCheckingDate: moment().add(4, 'year').format(),
    },
    validationSchema: yup.object().shape({
      currentCheckingDate: yup.string().required('Это поле обязательно'),
      futureCheckingDate: yup.string().required('Это поле обязательно'),
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
            value={moment(values.currentCheckingDate)}
            onChange={(date) => {
              if (!date) {
                return;
              }
              setFieldValue('currentCheckingDate', date.format());
              setFieldValue('futureCheckingDate', date.add(4, 'year').format());
            }}
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{errors.currentCheckingDate}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={moment(values.futureCheckingDate)}
            onChange={(date) => {
              if (!date) {
                return;
              }
              setFieldValue('futureCheckingDate', date.format());
            }}
            format="DD.MM.YYYY"
          />
          <ErrorMessage>{errors.futureCheckingDate}</ErrorMessage>
        </FormItem>
      </Wrapper>
    </Form>
  );
};
