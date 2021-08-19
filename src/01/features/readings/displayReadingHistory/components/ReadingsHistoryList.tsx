import { Flex } from '01/shared/ui/Layout/Flex';
import { useStore } from 'effector-react';
import { IndividualDeviceReadingsYearHistoryResponse } from 'myApi';
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { $readingHistory } from '../models';
import { ReactComponent as ArrowIconTop } from './icons/arrow.svg';
import { ReactComponent as ArrowBottom } from './icons/arrowBottom.svg';

export const ReadingsHistoryList = () => {
  const values = useStore($readingHistory);

  const { isYearOpen, openYear, closeYear } = useOpenedYears(
    values?.yearReadings || []
  );

  const renderYears = ({
    year,
  }: IndividualDeviceReadingsYearHistoryResponse) => {
    const isOpen = isYearOpen(year);

    return (
      <Year onClick={() => (isOpen ? closeYear : openYear)(year)}>
        <div>{year} год</div>
        {isOpen ? <ArrowIconTop /> : <ArrowBottom />}
      </Year>
    );
  };

  return (
    <Wrap>
      <TableHeader>
        {columnsNames.map((elem) => (
          <div>{elem}</div>
        ))}
      </TableHeader>
      {values?.yearReadings?.map(renderYears)}
    </Wrap>
  );
};

function useOpenedYears(years: IndividualDeviceReadingsYearHistoryResponse[]) {
  const [openedYears, setOpenedYears] = useState<
    { year: number; openedMonths: number[]; open: boolean }[]
  >([]);

  useEffect(
    () =>
      setOpenedYears(
        years?.map((elem) => ({
          year: elem.year,
          open: false,
          openedMonths: [],
        })) || []
      ),
    [years]
  );

  const openYear = (year: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) => (elem.year === year ? { ...elem, open: true } : elem))
    );

  const closeYear = (year: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) => (elem.year === year ? { ...elem, open: false } : elem))
    );

  const isYearOpen = (year: number) =>
    openedYears.find((elem) => elem.year === year)?.open;

  return { isYearOpen, openYear, closeYear };
}

const columnsNames = [
  'Период',
  'Показания',
  'Потребление',
  'Источник',
  'Последние показания',
];

const Wrap = styled.div`
  max-width: 960px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const TableHeader = styled(Grid)`
  padding: 16px;
  background: rgba(39, 47, 90, 0.04);
  border-bottom: 1px solid #dcdee4;
`;

const Year = styled(Flex)`
  cursor: pointer;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #dcdee4;
`;
