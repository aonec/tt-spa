import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import styled from 'styled-components';

export const PeriodDatePicker = () => {
  return (
    <FormItem label="Период">
      <Wrap>
        <DatePickerNative />
      </Wrap>
    </FormItem>
  );
};

const Wrap = styled.div`
  width: 50%;
`;
