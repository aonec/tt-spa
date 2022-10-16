import { useFormik } from 'formik';
import { EResourceType } from 'myApi';
import React, { FC, useEffect } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import { DevicePipeMagistralDictionary } from './SwitchDeviceForm.constants';
import {
  Wrapper,
  DeviceInfoWrapper,
  ResourceOptionWrapper,
  ResourceOptionNameWrapper,
  DevicePipeInfoWrapper,
  DeviceCheckingDatesWrapper,
} from './SwitchDeviceForm.styled';
import {
  SwitchDeviceFormProps,
  SwitchDeviceFormValues,
} from './SwitchDeviceForm.types';

export const SwitchDeviceForm: FC<SwitchDeviceFormProps> = ({
  device,
  devicePipe,
  handleChangeSwitchDevicePayload,
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
      lastCheckingDate: values.lastCheckingDate?.toISOString(),
      futureCheckingDate: values.futureCheckingDate?.toISOString(),
      openingDate: values.openingDate?.toISOString(),
    });
  }, [values]);

  useEffect(() => {
    if (!values.futureCheckingDate) return;

    setFieldValue(
      'futureCheckingDate',
      values.lastCheckingDate?.add('year', 3)
    );
  }, [values.lastCheckingDate]);

  const magistral = devicePipe?.hubConnection?.hub?.magistral
    ? DevicePipeMagistralDictionary[devicePipe.hubConnection.hub.magistral]
    : '';

  return (
    <Wrapper>
      <DeviceInfoWrapper>
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
        <FormItem label="Тип прибора">
          <Input
            value={device.typeName || ''}
            disabled
            placeholder="Введите тип прибора"
          />
        </FormItem>
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
      <DevicePipeInfoWrapper>
        <FormItem label="Диаметр прибора, мм">
          <Input
            disabled
            value={device.diameter || ''}
            placeholder="Введите диаметр прибора"
          />
        </FormItem>
        <FormItem label="Номер трубы">
          <Input
            disabled
            placeholder="Введите номер трубы"
            value={devicePipe?.hubConnection?.hub?.pipeNumber || ''}
          />
        </FormItem>
        <FormItem label="Магистраль">
          <Input disabled placeholder="Введите магистраль" value={magistral} />
        </FormItem>
        <FormItem label="Номер ввода">
          <Input
            disabled
            placeholder="Введите номер ввода"
            value={devicePipe?.hubConnection?.hub?.entryNumber || ''}
          />
        </FormItem>
      </DevicePipeInfoWrapper>
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
    </Wrapper>
  );
};
