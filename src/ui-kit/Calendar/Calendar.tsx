import React, { FC, useMemo } from 'react';
import {
  CalendarSC,
  DateCircle,
  HeaderWrapper,
  MonthWrapper,
  SliderWrapper,
  Wrapper,
  YearWrapper,
} from './Calendar.styled';
import { CalendarProps } from './Calendar.types';
import moment from 'moment';
import { ChevronIcon } from 'ui-kit/icons';

export const Calendar: FC<CalendarProps> = ({
  selectedDate,
  handleSelectDate,
  eventDates,
}) => {
  const currentDate = moment().startOf('day');
  const formatedSelectedDate = selectedDate && selectedDate.startOf('day');

  const formatedEventDates = useMemo(
    () => (eventDates || []).map((date) => date.startOf('day')),
    [eventDates],
  );

  return (
    <Wrapper>
      <CalendarSC
        fullscreen={false}
        value={currentDate}
        onSelect={handleSelectDate}
        dateFullCellRender={(date) => {
          const formatedDate = date.startOf('day');

          const isSelectedDate = selectedDate
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
        headerRender={({ value }) => {
          return (
            <HeaderWrapper>
              <SliderWrapper>
                <ChevronIcon />
                <MonthWrapper>{value.format('MMMM')}</MonthWrapper>
                <ChevronIcon className="right-chevron" />
              </SliderWrapper>

              <SliderWrapper>
                <ChevronIcon />
                <YearWrapper>{value.format('YYYY')}</YearWrapper>
                <ChevronIcon className="right-chevron" />
              </SliderWrapper>
            </HeaderWrapper>
          );
        }}
      />
    </Wrapper>
  );
};
