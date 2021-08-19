import { Flex } from '01/shared/ui/Layout/Flex';
import { useStore } from 'effector-react';
import moment from 'moment';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'myApi';
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { $readingHistory } from '../models';
import { ReactComponent as ArrowIconTop } from './icons/arrow.svg';
import { ReactComponent as ArrowBottom } from './icons/arrowBottom.svg';
import { SourceName } from './SourceIcon';

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

  const renderReading = ({
    reading,
    isFirst,
    month,
    arrowButton,
  }: {
    reading: IndividualDeviceReadingsItemHistoryResponse;
    isFirst?: boolean;
    arrowButton?: React.ReactElement;
    month: number;
  }) => {
    const WrapComponent = isFirst ? Month : PreviousReading;
    const monthName = isFirst ? (
      <span className="month-name">{getMonthName(month)}</span>
    ) : (
      <div></div>
    );
    const readings = <div>Readings</div>;
    const consumption = <div>consumption</div>;
    const source = (
      <SourceName sourceType={reading.source} user={reading.user} />
    );
    const uploadTime = (
      <div>{moment(reading.uploadTime).format('YYYY.MM.DD hh:mm')}</div>
    );
    const arrowButtonComponent = isFirst ? arrowButton : <ArrowButtonBlock />;

    return (
      <WrapComponent>
        {monthName}
        {readings}
        {consumption}
        {source}
        {uploadTime}
        {arrowButtonComponent}
      </WrapComponent>
    );
  };

  const renderMonth = ({
    month,
    year,
    readings,
  }: IndividualDeviceReadingsMonthHistoryResponse & { year: number }) => {
    const isOpen = isMonthOpen(year, month);

    const arrowButton = (
      <ArrowButton
        onClick={() => (isOpen ? closeMonth : openMonth)(year, month)}
      >
        <Arrow open={isOpen} />
      </ArrowButton>
    );

    return (isOpen
      ? readings
      : [...[(readings || [])[0]]]
    )?.map((reading, index) =>
      renderReading({ reading, month, isFirst: index === 0, arrowButton })
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
        years?.map((elem, index) => ({
          year: elem.year,
          open: index === 0,
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

const getMonthName = (month: number) =>
  moment().subtract(month, 'months').format('MMMM');

const Wrap = styled.div`
  max-width: 960px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.28fr 1fr;
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
  grid-template-columns: 1.2fr 1.2fr 1.2fr 1.5fr 1fr 0fr;
  padding: 16px;
  align-items: center;
  user-select: none;
  color: #272f5ab2;

  .month-name {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
    color: #272f5a;
  }
`;

const PreviousReading = styled(Month)`
  background: #272f5a08;
`;

const ArrowButton = styled(Flex)`
  justify-content: center;
  transform: translateX(10px);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background: #eff0f1;
  }
`;

const ArrowButtonBlock = styled.div`
  width: 30px;
  height: 30px;
`;
