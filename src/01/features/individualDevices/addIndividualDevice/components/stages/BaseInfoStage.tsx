import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { DatePickerTT, InputTT, SelectTT, SwitchTT } from '01/tt-components';
import { resources } from '01/tt-components/localBases';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form, Select } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore($individualDeviceMountPlaces);

  const { fields } = useForm(addIndividualDeviceForm);

  const onChange = (e: any) => {
    const field = (fields as any)[e.target.name];

    if (!field) return;

    field.onChange(e.target.value);
  };

  const onChangeDateField = (name: string) => (value: moment.Moment | null) => {
    if (!value || !(fields as any)[name]) return;

    (fields as any)[name].onChange(value.toISOString());
  };

  return (
    <>
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />

      <FormHeader>Общие данные о приборе</FormHeader>

      <FormWrap>
        <FormItem label="Тип ресурса">
          <StyledSelect placeholder="Выберите тип ресурса">
            {resources.map((elem) => (
              <Select.Option value={elem.value}>{elem.label}</Select.Option>
            ))}
          </StyledSelect>
        </FormItem>

        <FormItem label="Модель прибора">
          <InputTT
            placeholder="Введите модель прибора"
            name="model"
            onChange={onChange}
          />
        </FormItem>

        <FormItem label="Серийный номер">
          <InputTT
            type="number"
            placeholder="Введите модель прибора"
            onChange={onChange}
          />
        </FormItem>

        <FormItem label="Место установки">
          <StyledSelect placeholder="Выберите место установки">
            {mountPlaces?.map((elem) => (
              <Select.Option value={elem.id}>{elem.description}</Select.Option>
            ))}
          </StyledSelect>
        </FormItem>

        <FormItem label="Разрядность">
          <InputTT
            type="number"
            placeholder="Введите разрядность прибора"
            name="bitDepth"
            onChange={onChange}
          />
        </FormItem>

        <FormItem label="Множитель">
          <InputTT
            type="number"
            placeholder="Введите множитель прибора"
            name="scaleFactor"
            onChange={onChange}
          />
        </FormItem>

        <FormItem label="Первичные показания прибора">
          <InputTT
            type="number"
            placeholder="Введите первичные показания"
            onChange={onChange}
            disabled
          />
        </FormItem>

        <FormItem label="Дата ввода в эксплуатацию">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={onChangeDateField('lastCommercialAccountingDate')}
          />
        </FormItem>

        <FormItem label="Дата последней проверки прибора">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={onChangeDateField('lastCheckingDate')}
          />
        </FormItem>

        <FormItem label="Дата следующей проверки прибора">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={onChangeDateField('futureCheckingDate')}
          />
        </FormItem>

        <FormItem label="Магнитная пломба">
          <Flex>
            <SwitchTT
              onChange={fields.isInstalled.onChange}
              checked={fields.isInstalled.value}
            />
            <InputTT placeholder="Тип пломбы" disabled />
          </Flex>
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePicker format="DD.MM.YYYY" disabled />
        </FormItem>
      </FormWrap>
    </>
  );
};

const DatePicker = styled(DatePickerTT)`
  border-radius: 4px;
`;

const FormItem = styled(Form.Item)`
  width: 100%;
`;

const FormWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
  margin-bottom: -10px;
`;
