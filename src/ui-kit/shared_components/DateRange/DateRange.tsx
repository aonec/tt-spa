import React, { FC } from 'react';
import { DateRangeProps } from './DateRange.types';
import { DateWrapper } from './DateRange.styled';

export const DateRange: FC<DateRangeProps> = ({
  firstDate,
  lastDate,
  bold,
}) => {
  if (firstDate === null) return null;
  if (lastDate === null) return null;
  const preparedFirstDate = new Date(firstDate);
  const preparedLastDate = new Date(lastDate);
  return (
    <DateWrapper bold={bold}>
      {preparedFirstDate.toLocaleDateString()} —{' '}
      {preparedLastDate.toLocaleDateString()}
    </DateWrapper>
  );
};
