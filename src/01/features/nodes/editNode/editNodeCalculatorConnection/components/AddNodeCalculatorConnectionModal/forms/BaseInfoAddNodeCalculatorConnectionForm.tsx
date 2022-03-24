import { Form } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';
import { DatePickerNative } from '../../../../../../../shared/ui/DatePickerNative';
import { Grid } from '../../../../../../../shared/ui/Layout/Grid';
import InputTT from '../../../../../../../tt-components/InputTT';
import { SelectItem } from '../../../../../../../tt-components/localBases';
import { StyledSelect } from '../../../../../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';

interface Props {
  calculatorTypes: SelectItem[];
}

export const BaseInfoAddNodeCalculatorConnectionForm: FC<Props> = ({
  calculatorTypes,
}) => {
  return (
    <Wrap>
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Серийный номер">
          <InputTT placeholder="Введите серийный номер вычислителя" />
        </Form.Item>
        <Form.Item label="Тип вычислителя">
          <StyledSelect placeholder="Выберите тип вычислителя из списка">
            {calculatorTypes.map((elem) => (
              <StyledSelect.Option key={elem.id} value={elem.id}>
                {elem.label}
              </StyledSelect.Option>
            ))}
          </StyledSelect>
        </Form.Item>
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
