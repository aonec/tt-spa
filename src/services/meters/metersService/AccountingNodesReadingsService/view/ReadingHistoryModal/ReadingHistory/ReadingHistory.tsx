import { FC } from 'react';
import { TableHeader, Wrapper } from './ReadingHistory.styled';
import { Props } from './ReadingHistory.types';
import { YearItem } from './YearItem';

export const ReadingHistory: FC<Props> = ({ preparedReadings }) => {
  return (
    <Wrapper>
      <TableHeader>
        <div>Период</div>
        <div>Показания</div>
        <div>Оператор</div>
        <div>Последние показания</div>
      </TableHeader>

      {preparedReadings?.map((yearReading) => (
        <YearItem yearReading={yearReading} key={yearReading.year} />
      ))}
    </Wrapper>
  );
};
