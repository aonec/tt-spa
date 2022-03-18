import { Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { DatePickerNative } from '../../../../../../../shared/ui/DatePickerNative';
import { Grid } from '../../../../../../../shared/ui/Layout/Grid';
import InputTT from '../../../../../../../tt-components/InputTT';
import { StyledSelect } from '../../../../../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';

export const BaseInfoAddNodeCalculatorConnectionForm = () => {
  return (
    <Wrap>
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Серийный номер">
          <InputTT placeholder="Введите серийный номер вычислителя" />
        </Form.Item>
        <Form.Item label="Тип вычислителя">
          <StyledSelect placeholder="Выберите тип вычислителя из списка" />
        </Form.Item>
        <Form.Item label="Номер ввода">
          <StyledSelect placeholder="Выберите тип вычислителя из списка" />
        </Form.Item>
        <div></div>
        <Form.Item label="Дата последней поверки прибора">
          <DatePickerNative />
        </Form.Item>
        <Form.Item label="Дата следующей поверки прибора">
          <DatePickerNative />
        </Form.Item>
      </Grid>
    </Wrap>
  );
};

const Wrap = styled.div``;
