import { Flex } from '01/shared/ui/Layout/Flex';
import { useStore } from 'effector-react';
import moment from 'moment';
import {
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'myApi';
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { $readingHistory } from '../models';
import { ReactComponent as ArrowIconTop } from './icons/arrow.svg';
import { ReactComponent as ArrowBottom } from './icons/arrowBottom.svg';

export const ReadingsHistoryList = () => {
  const values = useStore($readingHistory);

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  const renderMonth = ({
    month,
    year,
  }: IndividualDeviceReadingsMonthHistoryResponse & { year: number }) => {
    const isOpen = isMonthOpen(year, month);

    const arrowButton = (
      <ArrowButton
        onClick={() => (isOpen ? closeMonth : openMonth)(year, month)}
      >
        <Arrow open={isOpen} />
      </ArrowButton>
    );

    return (
      <Month>
        <span className="month-name">
          {moment().subtract(month, 'months').format('MMMM')}
        </span>
        <div>Readings</div>
        <div>consumation</div>
        <div>consumation</div>
        <div>last changes</div>
        {arrowButton}
      </Month>
    );
  };

  const renderYear = ({
    year,
    monthReadings,
  }: IndividualDeviceReadingsYearHistoryResponse) => {
    const isOpen = isYearOpen(year);

    return (
      <>
        <Year onClick={() => (isOpen ? closeYear : openYear)(year)}>
          <div>{year} год</div>
          <Arrow open={isOpen} />
        </Year>
        {isOpen &&
          monthReadings?.map((month) => renderMonth({ ...month, year }))}
      </>
    );
  };

  return (
    <Wrap>
      <TableHeader>
        {columnsNames.map((elem) => (
          <div>{elem}</div>
        ))}
      </TableHeader>
      {values?.yearReadings?.map(renderYear)}
    </Wrap>
  );
};

const Arrow = ({ open }: { open?: boolean }) =>
  open ? <ArrowIconTop /> : <ArrowBottom />;

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

  const openMonth = (year: number, month: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) =>
        elem.year === year
          ? { ...elem, openedMonths: [...elem.openedMonths, month] }
          : elem
      )
    );

  const closeMonth = (year: number, month: number) =>
    setOpenedYears((prev) =>
      prev.map((elem) =>
        elem.year === year
          ? {
              ...elem,
              openedMonths: elem.openedMonths.filter((elem) => elem !== month),
            }
          : elem
      )
    );

  const isMonthOpen = (year: number, month: number) =>
    Boolean(
      openedYears
        .find((elem) => elem.year === year)
        ?.openedMonths.find((elem) => elem === month)
    );

  return {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  };
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
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #dcdee4;
`;

const Month = styled(Grid)`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0fr;
  padding: 16px;
  align-items: center;
  user-select: none;

  .month-name {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
    color: #272f5a;
  }
`;

const ArrowButton = styled(Flex)`
  justify-content: center;
  transform: translateX(8px);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background: #eff0f1;
  }
`;
