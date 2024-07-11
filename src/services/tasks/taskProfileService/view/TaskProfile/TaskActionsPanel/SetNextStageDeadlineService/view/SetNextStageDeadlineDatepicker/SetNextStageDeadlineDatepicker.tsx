import dayjs from 'api/dayjs';
import React, { FC, useState } from 'react';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { SetNextStageDeadlineDatepickerProps } from './SetNextStageDeadlineDatepicker.types';

export const SetNextStageDeadlineDatepicker: FC<
  SetNextStageDeadlineDatepickerProps
> = ({ handleDateChange }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const handleChange = (date: dayjs.Dayjs | null) => {
    setDate(date || null);
    const formattedDate = date?.format('YYYY-MM-DD');

    if (formattedDate) handleDateChange(formattedDate);
  };

  return (
    <FormItem label="Дата">
      <DatePicker
        value={date && dayjs(date)}
        onChange={(date) => handleChange(date)}
        allowClear
        placeholder="Выберите дату"
        format={{ format: 'DD.MM.YYYY', type: 'mask' }}
      />
    </FormItem>
  );
};
