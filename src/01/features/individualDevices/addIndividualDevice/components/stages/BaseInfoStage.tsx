import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { DatePickerTT, InputTT, SelectTT, SwitchTT } from '01/tt-components';
import { resources } from '01/tt-components/localBases';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form, Select } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FormHeader } from '../Header';

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore($individualDeviceMountPlaces);

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
          <InputTT placeholder="Введите модель прибора" />
        </FormItem>

        <FormItem label="Серийный номер">
          <InputTT type="number" placeholder="Введите модель прибора" />
        </FormItem>

        <FormItem label="Место установки">
          <StyledSelect placeholder="Выберите место установки">
            {mountPlaces?.map((elem) => (
              <Select.Option value={elem.id}>{elem.description}</Select.Option>
            ))}
          </StyledSelect>
        </FormItem>

        <FormItem label="Разрядность">
          <InputTT type="number" placeholder="Введите разрядность прибора" />
        </FormItem>

        <FormItem label="Множитель">
          <InputTT type="number" placeholder="Введите множитель прибора" />
        </FormItem>

        <FormItem label="Первичные показания прибора">
          <InputTT type="number" placeholder="Введите первичные показания" />
        </FormItem>

        <FormItem label="Дата ввода в эксплуатацию">
          <DatePicker format="DD.MM.YYYY" />
        </FormItem>

        <FormItem label="Дата последней проверки прибора">
          <DatePicker format="DD.MM.YYYY" />
        </FormItem>

        <FormItem label="Дата следующей проверки прибора">
          <DatePicker format="DD.MM.YYYY" />
        </FormItem>

        <FormItem label="Магнитная пломба">
          <Flex>
            <SwitchTT onChange={() => {}} checked={false} />
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
