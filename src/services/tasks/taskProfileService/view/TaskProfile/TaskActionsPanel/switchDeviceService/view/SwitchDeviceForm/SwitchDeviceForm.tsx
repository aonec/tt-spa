import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import {
  DeviceInfoWrapper,
  DeviceCheckingDatesWrapper,
} from './SwitchDeviceForm.styled';
import {
  SwitchDeviceFormProps,
  SwitchDeviceFormValues,
} from './SwitchDeviceForm.types';
import { ResourceSelect } from 'ui-kit/shared/ResourceSelect';

export const SwitchDeviceForm: FC<SwitchDeviceFormProps> = ({
  device,
  handleChangeSwitchDevicePayload,
  isCalculator,
  calculatorInfos,
}) => {
  const { values, handleChange, setFieldValue } =
    useFormik<SwitchDeviceFormValues>({
      initialValues: {
        lastCheckingDate: null,
        futureCheckingDate: null,
        openingDate: null,
        model: '',
        serialNumber: '',
        calculatorInfoId: null,
      },
      onSubmit: () => {},
    });

  useEffect(() => {
    handleChangeSwitchDevicePayload({
      ...values,
      lastCheckingDate: values.lastCheckingDate?.format('YYYY-MM-DD'),
      futureCheckingDate: values.futureCheckingDate?.format('YYYY-MM-DD'),
      openingDate: values.openingDate?.format('YYYY-MM-DD'),
    });
  }, [values, handleChangeSwitchDevicePayload]);

  useEffect(() => {
    if (!values.lastCheckingDate) return;

    setFieldValue(
      'futureCheckingDate',
      values.lastCheckingDate?.add(4, 'year'),
    );
  }, [values.lastCheckingDate, setFieldValue]);

  useEffect(() => {
    if (!values.calculatorInfoId) return;

    const model =
      calculatorInfos.find(({ id }) => id === values.calculatorInfoId)?.model ||
      '';

    setFieldValue('model', model);
  }, [values.calculatorInfoId, setFieldValue, calculatorInfos]);

  return (
    <div>
      <DeviceInfoWrapper>
        {!isCalculator && (
          <FormItem label="Тип ресурса">
            <ResourceSelect disabled resource={device.resource} />
          </FormItem>
        )}
        <FormItem label="Тип прибора">
          <Input
            value={device.typeName || ''}
            disabled
            placeholder="Введите тип прибора"
          />
        </FormItem>
        {isCalculator && <div />}
        <FormItem label="Серийный номер">
          <Input
            name="serialNumber"
            value={values.serialNumber}
            onChange={handleChange}
            placeholder="Введите номер прибора"
          />
        </FormItem>
        <FormItem label="Модель прибора">
          {!isCalculator && (
            <Input
              name="model"
              value={values.model}
              onChange={handleChange}
              placeholder="Введите название"
            />
          )}
          {isCalculator && (
            <Select
              placeholder="Выберите"
              value={values.calculatorInfoId || undefined}
              onChange={(id) => setFieldValue('calculatorInfoId', id)}
            >
              {calculatorInfos.map(({ id, model }) => (
                <Select.Option key={id} value={id}>
                  {model}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
      </DeviceInfoWrapper>
      <DeviceCheckingDatesWrapper>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => setFieldValue('lastCheckingDate', date)}
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={values.futureCheckingDate}
            onChange={(date) => setFieldValue('futureCheckingDate', date)}
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
        </FormItem>
        <FormItem label="Дата установки прибора">
          <DatePicker
            value={values.openingDate}
            onChange={(date) => setFieldValue('openingDate', date)}
            format={{ format: 'DD.MM.YYYY', type: 'mask' }}
          />
        </FormItem>
      </DeviceCheckingDatesWrapper>
    </div>
  );
};
