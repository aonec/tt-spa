import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Form } from 'antd';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { SpaceLine } from 'ui-kit/SpaceLine';
import { getInitialDateFieldValue } from 'services/nodes/createNodeService/view/CreateNodePage/CommonData/CommonData.utils';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { validationSchema } from './DeviceStep.constants';
import {
  LineWrapper,
  MagistralLabel,
  PipeNumber,
  PipeSelectOption,
} from './DeviceStep.styled';
import { DeviceStepProps } from './DeviceStep.types';
import { MagistralsDisctionary } from 'dictionaries';
import dayjs from 'api/dayjs';

export const DeviceStep: FC<DeviceStepProps> = ({
  communicationPipes,
  requestPayload,
  updateRequestPayload,
  formId,
}) => {
  const { values, setFieldValue, handleChange, errors, handleSubmit } =
    useFormik({
      initialValues: {
        model: requestPayload.model,
        serialNumber: requestPayload.serialNumber,
        lastCheckingDate: getInitialDateFieldValue(
          requestPayload.lastCheckingDate,
        ),
        futureCheckingDate: getInitialDateFieldValue(
          requestPayload.futureCheckingDate,
        ),
        pipeId: requestPayload.pipeId || null,
      },
      validationSchema,
      enableReinitialize: true,
      validateOnChange: false,
      onSubmit: (values) => {
        if (!values.pipeId) return;

        updateRequestPayload({
          model: values.model,
          serialNumber: values.serialNumber,
          lastCheckingDate: values.lastCheckingDate?.format('YYYY-MM-DD'),
          futureCheckingDate: values.futureCheckingDate?.format('YYYY-MM-DD'),
          pipeId: values.pipeId,
        });
      },
    });

  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <LineWrapper>
        <FormItem label="Модель прибора">
          <Input
            placeholder="Введите"
            name="model"
            value={values.model}
            onChange={handleChange}
          />
          <ErrorMessage>{errors.model}</ErrorMessage>
        </FormItem>
        <FormItem label="Серийный номер">
          <Input
            placeholder="Введите"
            name="serialNumber"
            value={values.serialNumber}
            onChange={handleChange}
          />
          <ErrorMessage>{errors.serialNumber}</ErrorMessage>
        </FormItem>
        <FormItem label="Дата последней поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue('futureCheckingDate', dayjs(date).add(4, 'year'));
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
      </LineWrapper>
      <SpaceLine />
      <LineWrapper>
        <FormItem label="Труба">
          <Select
            placeholder="Выберите"
            value={values.pipeId ? String(values.pipeId) : undefined}
            onChange={(value) => setFieldValue('pipeId', Number(value))}
          >
            {communicationPipes.map((pipe) => (
              <Select.Option key={pipe.id} value={pipe.id}>
                <PipeSelectOption>
                  <PipeNumber>№{pipe.number}</PipeNumber> ({pipe.diameter}мм){' '}
                  <MagistralLabel>магистраль:</MagistralLabel>{' '}
                  {pipe.magistral && MagistralsDisctionary[pipe.magistral]}
                </PipeSelectOption>
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>{errors.pipeId}</ErrorMessage>
        </FormItem>
      </LineWrapper>
    </Form>
  );
};
