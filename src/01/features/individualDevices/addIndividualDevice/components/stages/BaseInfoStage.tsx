import { Flex } from '01/shared/ui/Layout/Flex';
import { DatePickerTT, InputTT, SelectTT, SwitchTT } from '01/tt-components';
import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { FormHeader } from '../Header';

export const BaseInfoStage = () => {
  return (
    <>
      <FormHeader>Общие данные о приборе</FormHeader>

      <FormWrap>
        <FormItem label="Тип ресурса">
          <StyledSelect options={[]} placeholder="Выберите тип ресурса" />
        </FormItem>

        <FormItem label="Модель прибора">
          <InputTT placeholder="Введите модель прибора" />
        </FormItem>

        <FormItem label="Серийный номер">
          <InputTT type="number" placeholder="Введите модель прибора" />
        </FormItem>

        <FormItem label="Место установки">
          <StyledSelect options={[]} placeholder="Выберите место установки" />
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

const StyledSelect = styled(SelectTT)`
  .ant-select-selector {
    border-radius: 4px !important;
  }
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
