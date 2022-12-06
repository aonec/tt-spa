import { Form } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { FC, useEffect } from 'react';
import { MagistralsDisctionary } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/meteringDevicesService/view/MeteringDevicesListModal/MeteringDeviceListItem/MeteringDeviceListItem.constants';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { addCommunicationPipeService } from '../../AddCommunicationPipeModal/AddCommunicationPipeModal.model';
import {
  CreatePipeButtonWrapper,
  LineWrapper,
  MagistralLabel,
  PipeNumber,
  PipeSelectOption,
} from './DeviceStep.styled';
import { DeviceStepProps } from './DeviceStep.types';

const { inputs } = addCommunicationPipeService;

export const DeviceStep: FC<DeviceStepProps> = ({
  openAddPipeModal,
  communicationPipes,
}) => {
  const { values, setFieldValue, handleChange } = useFormik({
    initialValues: {
      model: '',
      serialNumber: '',
      lastCheckingDate: null as null | moment.Moment,
      futureCheckingDate: null as null | moment.Moment,
      pipeId: null as null | number,
    },
    onSubmit: () => {},
  });

  useEffect(
    () =>
      inputs.handleCreatePipe.watch((id) => setFieldValue('pipeId', id))
        .unsubscribe,
    []
  );

  return (
    <Form>
      <LineWrapper>
        <FormItem label="Модель прибора">
          <Input
            placeholder="Введите"
            name="model"
            value={values.model}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem label="Серийный номер">
          <Input
            placeholder="Введите"
            name="serialNumber"
            value={values.serialNumber}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem label="Дата последней поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => setFieldValue('lastCheckingDate', date)}
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
        <FormItem label="Труба">
          <Select
            placeholder="Выберите"
            value={values.pipeId || undefined}
            onChange={(value) => setFieldValue('pipeId', value)}
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
        </FormItem>
        <CreatePipeButtonWrapper>
          <LinkButton onClick={openAddPipeModal}>+ Добавить трубу</LinkButton>
        </CreatePipeButtonWrapper>
      </LineWrapper>
    </Form>
  );
};
