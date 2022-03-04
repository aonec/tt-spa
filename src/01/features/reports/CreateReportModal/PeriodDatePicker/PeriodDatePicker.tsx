import { DatePickerTT } from '01/tt-components';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  date: moment.Moment | null;
  onChange(date: moment.Moment): void;
}

export const PeriodDatePicker: FC<Props> = ({ date, onChange }) => {
  return (
    <FormItem label="Период">
      <Wrap>
        <DatePickerTT
          format="MMMM YYYY"
          picker="month"
          value={date}
          onChange={(value) => value && onChange(value)}
        />
      </Wrap>
    </FormItem>
  );
};

const Wrap = styled.div`
  width: 50%;
`;
