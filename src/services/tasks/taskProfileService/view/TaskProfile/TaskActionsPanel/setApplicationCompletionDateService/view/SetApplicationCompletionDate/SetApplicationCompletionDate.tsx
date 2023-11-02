import React, { FC, useState } from 'react';
import { SetApplicationCompletionDateProps } from './SetApplicationCompletionDate.types';
import dayjs from 'dayjs';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import {
  GridContainer,
  TimePickerSC,
} from './SetApplicationCompletionDate.styled';

export const SetApplicationCompletionDate: FC<
  SetApplicationCompletionDateProps
> = ({ handleDateChange }) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);

  const handleChange = (
    date?: dayjs.Dayjs | null,
    time?: dayjs.Dayjs | null,
  ) => {
    setDate(date || null);
    setTime(time || null);

    if (date && time) {
      const dateTime = date
        .format('YYYY-MM-DD')
        .concat('T', time.format('HH:mm') || '');

      const dateTimeUTC = dayjs(dateTime).utcOffset(0).toISOString();

      handleDateChange(dateTimeUTC);
    }
  };

  return (
    <>
      <FormItem label="Дата выполнения заявки">
        <GridContainer>
          <DatePicker
            allowClear
            placeholder="Выберите дату"
            value={date}
            onChange={(date) => handleChange(date, time)}
            format="DD.MM.YYYY"
          />

          <TimePickerSC
            placeholder="Время"
            value={time}
            onChange={(time) => handleChange(date, time)}
          />
          <div></div>
        </GridContainer>
      </FormItem>
    </>
  );
};
