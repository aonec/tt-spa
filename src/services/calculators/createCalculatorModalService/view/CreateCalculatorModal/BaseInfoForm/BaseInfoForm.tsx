import { Form } from 'antd';
import React, { FC } from 'react';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { BaseInfoFormProps } from './BaseInfoForm.types';
import { validationSchema } from './BaseInfoForm.constants';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Wrapper } from './BaseInfoForm.styled';
import { DatePicker } from 'ui-kit/DatePicker';
import { getDatePickerValue } from 'utils/getDatePickerValue';

export const BaseInfoForm: FC<BaseInfoFormProps> = ({
  calculatorTypes,
  formId,
  updatePayload,
  initialValues,
}) => {
  const { values, setFieldValue, submitForm, errors } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: updatePayload,
  });

  return (
    <Form id={formId} onSubmitCapture={submitForm}>
      <Wrapper>
        <FormItem label="Серийный номер">
          <Input
            value={values.serialNumber}
            onChange={(e) => setFieldValue('serialNumber', e.target.value)}
            placeholder="Введите серийный номер вычислителя"
          />
          <ErrorMessage>{errors.serialNumber}</ErrorMessage>
        </FormItem>
        <FormItem label="Тип вычислителя">
          <Select
            placeholder="Выберите тип вычислителя из списка"
            value={values.infoId}
            onChange={(infoId) => setFieldValue('infoId', infoId)}
          >
            {calculatorTypes.map((elem) => (
              <Select.Option key={elem.id} value={elem.id}>
                {elem.label}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.infoId}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата последней поверки прибора">
          <DatePicker
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
            value={getDatePickerValue(values.lastCheckingDate)}
            onChange={(lastCheckingDate) => {
              setFieldValue(
                'lastCheckingDate',
                lastCheckingDate?.format('YYYY-MM-DD'),
              );
            }}
          />
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
            value={getDatePickerValue(values.futureCheckingDate)}
            onChange={(futureCheckingDate) => {
              setFieldValue(
                'futureCheckingDate',
                futureCheckingDate?.format('YYYY-MM-DD'),
              );
            }}
          />
        </FormItem>
      </Wrapper>
    </Form>
  );
};
