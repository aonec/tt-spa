import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { DatePickerTT } from '01/tt-components';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import styled from 'styled-components';

export const PeriodDatePicker = () => {
  return (
    <FormItem label="Период">
      <Wrap>
        <DatePickerTT format="MMMM YYYY" picker="month" />
      </Wrap>
    </FormItem>
  );
};

const Wrap = styled.div`
  width: 50%;
`;
