import { useFormik } from 'formik';
import { EResourceType } from 'myApi';
import React, { FC, useEffect } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import {
  DeviceInfoWrapper,
  ResourceOptionWrapper,
  ResourceOptionNameWrapper,
  DeviceCheckingDatesWrapper,
} from './SwitchDeviceForm.styled';
import {
  SwitchDeviceFormProps,
  SwitchDeviceFormValues,
} from './SwitchDeviceForm.types';

export const SwitchDeviceForm: FC<SwitchDeviceFormProps> = ({
  device,
  handleChangeSwitchDevicePayload,
  isCalculator,
}) => {
  const {
    values,
    handleChange,
    setFieldValue,
  } = useFormik<SwitchDeviceFormValues>({
    initialValues: {
      lastCheckingDate: null,
      futureCheckingDate: null,
      openingDate: null,
      model: '',
      serialNumber: '',
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    handleChangeSwitchDevicePayload({
      ...values,
      lastCheckingDate: values.lastCheckingDate?.format("YYYY-MM-DD"),
      futureCheckingDate: values.futureCheckingDate?.format("YYYY-MM-DD"),
      openingDate: values.openingDate?.format("YYYY-MM-DD"),
    });
  }, [values]);

  useEffect(() => {
    if (!values.lastCheckingDate) return;

    setFieldValue(
      'futureCheckingDate',
      values.lastCheckingDate?.add(4, 'year')
    );
  }, [values.lastCheckingDate]);

  return (
    <div>
      <DeviceInfoWrapper>
        {!isCalculator && (
          <FormItem label="Тип ресурса">
            <Select disabled value={device.resource || undefined}>
              {Object.values(EResourceType).map((resource) => (
                <Select.Option value={resource} key={resource}>
                  <ResourceOptionWrapper>
                    <ResourceIconLookup resource={resource} />
                    <ResourceOptionNameWrapper>
                      {resourceNamesLookup[resource]}
                    </ResourceOptionNameWrapper>
                  </ResourceOptionWrapper>
                </Select.Option>
              ))}
            </Select>
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
          <Input
            name="model"
            value={values.model}
            onChange={handleChange}
            placeholder="Введите название"
          />
        </FormItem>
      </DeviceInfoWrapper>
      <DeviceCheckingDatesWrapper>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => setFieldValue('lastCheckingDate', date)}
            format="DD.MM.YYYY"
          />
        </FormItem>
        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={values.futureCheckingDate}
            onChange={(date) => setFieldValue('futureCheckingDate', date)}
            format="DD.MM.YYYY"
          />
        </FormItem>
        <FormItem label="Дата установки прибора">
          <DatePicker
            value={values.openingDate}
            onChange={(date) => setFieldValue('openingDate', date)}
            format="DD.MM.YYYY"
          />
        </FormItem>
      </DeviceCheckingDatesWrapper>
    </div>
  );
};
