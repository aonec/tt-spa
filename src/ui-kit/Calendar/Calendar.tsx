import React, { FC, useMemo } from 'react';
import {
  CalendarSC,
  DateCircle,
  HeaderWrapper,
  SliderWrapper,
  TextWrapper,
} from './Calendar.styled';
import { CalendarProps } from './Calendar.types';
import dayjs from 'api/dayjs';
import { ChevronIcon } from 'ui-kit/icons';

export const Calendar: FC<CalendarProps> = ({
  selectedDate,
  handleSelectDate,
  eventDates,
}) => {
  const currentDate = dayjs().startOf('day');
  const formatedSelectedDate = selectedDate && selectedDate.startOf('day');

  const formatedEventDates = useMemo(
    () => (eventDates || []).map((date) => date.startOf('day')),
    [eventDates],
  );

  return (
    <CalendarSC
      fullscreen={false}
      value={selectedDate || undefined}
      onChange={handleSelectDate}
      fullCellRender={(date) => {
        const formatedDate = date.startOf('day');

        const isSelectedDate = formatedSelectedDate
          ? formatedDate.diff(formatedSelectedDate, 'days') === 0
          : false;
        const isCurrentDate = formatedDate.diff(currentDate, 'days') === 0;
        const isEventDate = formatedEventDates
          .map((eventDate) => formatedDate.diff(eventDate, 'days') === 0)
          .includes(true);

        return (
          <DateCircle
            isSelectedDate={isSelectedDate}
            isCurrentDate={isCurrentDate}
            isEventDate={isEventDate}
          >
            {date.format('DD')}
          </DateCircle>
        );
      }}
      headerRender={({ value, onChange }) => (
        <HeaderWrapper>
          <SliderWrapper>
            <ChevronIcon
              onClick={() => onChange(value.clone().subtract(1, 'month'))}
            />
            <TextWrapper>{value.format('MMMM')}</TextWrapper>
            <ChevronIcon
              className="right-chevron"
              onClick={() => onChange(value.clone().add(1, 'month'))}
            />
          </SliderWrapper>

          <SliderWrapper>
            <ChevronIcon
              onClick={() => onChange(value.clone().subtract(1, 'year'))}
            />
            <TextWrapper>{value.format('YYYY')}</TextWrapper>
            <ChevronIcon
              className="right-chevron"
              onClick={() => onChange(value.clone().add(1, 'year'))}
            />
          </SliderWrapper>
        </HeaderWrapper>
      )}
    />
  );
};
