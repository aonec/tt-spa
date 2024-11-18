import FormItem from 'antd/lib/form/FormItem';
import dayjs from 'api/dayjs';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { DatePicker } from 'ui-kit/DatePicker';

interface Props {
  date: dayjs.Dayjs | null;
  onChange(date: dayjs.Dayjs): void;
  format?: string;
}

export const PeriodDatePicker: FC<Props> = ({ date, onChange, format }) => {
  const handleChange = useCallback(
    (value: dayjs.Dayjs | null) => {
      if (value) onChange(value);
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
