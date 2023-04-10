import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';

interface Props {
  date: moment.Moment | null;
  onChange(date: moment.Moment): void;
  format?: string;
}

export const PeriodDatePicker: FC<Props> = ({ date, onChange, format }) => {
  const handleChange = useCallback(
    (value: moment.Moment | null) => {
      value && onChange(value);
    },
    [onChange],
  );
  return (
    <FormItem label="Период">
      <Wrap>
        <DatePicker
          format={format}
          picker="month"
          value={date}
          onChange={handleChange}
        />
      </Wrap>
    </FormItem>
  );
};

const Wrap = styled.div`
  width: 50%;
`;
