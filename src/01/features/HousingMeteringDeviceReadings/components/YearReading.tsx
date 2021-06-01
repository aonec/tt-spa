import {
  MonthReadingsType,
  YearReadingsType,
} from '../lib/groupReadingsByDates';
import { monthByNumbers } from '../lib/monthTransform';
import React from 'react';
import styled from 'styled-components';
import { MonthReading } from './MonthReading';

export const YearReading = ({
  yearElement,
}: {
  yearElement: YearReadingsType;
}) => {
  const sortByMonthFn = (a: MonthReadingsType, b: MonthReadingsType) =>
    monthByNumbers[b.month] - monthByNumbers[a.month];

  const mapByMonthFn = (monthElement: MonthReadingsType) => (
    <MonthReading monthElement={monthElement} />
  );

  const monthElements = yearElement.items
    ?.sort(sortByMonthFn)
    .map(mapByMonthFn);

  return (
    <YearReadings>
      <Year>{yearElement.year} год</Year>
      <div>{monthElements}</div>
    </YearReadings>
  );
};

const YearReadings = styled.div`
  display: flex;
  flex-direction: column;
`;

const Year = styled.div`
  padding: 8px 16px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--main-90);
  border-bottom: 1px solid var(--frame);
`;
