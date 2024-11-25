import { FC, useMemo } from 'react';
import { MonthName, Reading, ReadingDate, Wrapper } from './MonthItem.styled';
import { Props } from './MonthItem.types';
import { getLatestUploadTimeItem } from './MonthItem.utils';
import dayjs from 'dayjs';
import { getMonthName } from 'services/meters/readingsHistoryService/utils';

export const MonthItem: FC<Props> = ({ monthData }) => {

  const actialReading = useMemo(() => {
    if (!monthData.readings) {
      return null;
    }

    if (monthData.readings.length === 1) {
      return monthData.readings[0];
    } else {
      return getLatestUploadTimeItem(monthData.readings);
    }
  }, [monthData]);

  const monthName = getMonthName(monthData.month);

  const value = Math.round(Number(actialReading?.value1));

  const date = dayjs(actialReading?.uploadTime).format('DD.MM.YYYY hh:mm');

  return (
    <Wrapper>
      <MonthName>{monthName}</MonthName>
      <div>{value} кВт/ч</div>
      <div>{actialReading?.user?.name || '-'}</div>
      <ReadingDate>{date || '-'}</ReadingDate>
    </Wrapper>
  );
};
