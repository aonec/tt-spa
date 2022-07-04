import { DatePickerTT } from '01/tt-components';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'time';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  date: moment.Moment | null;
  onChange(date: moment.Moment): void;
}

export const PeriodDatePicker: FC<Props> = ({ date, onChange }) => {
  const handleChange = useCallback(
    (value: moment.Moment | null) => value && onChange(value),
    [onChange]
  );
  return (
    <FormItem label="Период">
      <Wrap>
        <DatePickerTT
          format="MMMM YYYY"
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
