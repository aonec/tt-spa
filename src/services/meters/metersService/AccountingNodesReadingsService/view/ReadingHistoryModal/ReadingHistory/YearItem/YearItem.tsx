import { FC, useState } from 'react';
import { Wrapper } from './YearItem.styled';
import { Props } from './YearItem.types';
import { Arrow } from 'services/meters/readingsHistoryService/readingsHistoryListService/view/ReadingsHistoryList/Arrow';
import { MonthItem } from './MonthItem';

export const YearItem: FC<Props> = ({ yearReading }) => {

  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <Wrapper onClick={() => setOpen(!isOpen)}>
        <div>{yearReading.year} год</div>
        <Arrow open={isOpen || false} />
      </Wrapper>
      {isOpen &&
        yearReading.monthReadings?.map((monthData) => (
          <MonthItem monthData={monthData} />
        ))}
    </>
  );
};
