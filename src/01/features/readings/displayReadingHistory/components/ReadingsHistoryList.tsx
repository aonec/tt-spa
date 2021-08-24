import { Flex } from '01/shared/ui/Layout/Flex';
import { useStore } from 'effector-react';
import moment from 'moment';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'myApi';
import React from 'react';
import styled from 'styled-components';
import { useOpenedYears } from '../hooks/useOpenedYears';
import { ReactComponent as ArrowIconTop } from '../icons/arrow.svg';
import { ReactComponent as ArrowBottom } from '../icons/arrowBottom.svg';
import { RenderReadingFields } from './ReadingFields';
import { SourceName } from './SourceIcon';
import {
  getMonthName,
  getReadingValuesArray,
  getReadingValuesObject,
} from '../utils';
import { $individualDevice } from '01/features/individualDevices/displayIndividualDevice/models';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import { useReadingHistoryValues } from '../hooks/useReadingValues';

export const ReadingsHistoryList = () => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
  } = useReadingHistoryValues();
  const device = useStore($individualDevice);

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  interface RenderReading {
    reading: IndividualDeviceReadingsItemHistoryResponse;
    isFirst?: boolean;
    arrowButton?: React.ReactElement;
    month: number;
    year: number;
  }

  const renderReading = ({
    year,
    reading,
    isFirst,
    month,
    arrowButton,
  }: RenderReading) => {
    const WrapComponent = isFirst ? Month : PreviousReading;

    const monthName = isFirst ? (
      <span className="month-name">{getMonthName(month)}</span>
    ) : (
      <div></div>
    );

    const getReadingValues = (type: 'value' | 'consumption') =>
      getReadingValuesArray(
        reading,
        type,
        getIndividualDeviceRateNumByName(device?.rateType!)
      );

    const readings = (
      <RenderReadingFields
        onBlur={() =>
          uploadReading({
            ...getReadingValuesObject(
              reading,
              getIndividualDeviceRateNumByName(device?.rateType!)
            ),
            deviceId: device?.id!,
            readingDate: reading.readingDate || moment().toISOString(),
            isForced: true,
          } as any)
        }
        status={uploadingReadingsStatuses[reading.readingDate || '']}
        editable
        values={getReadingValues('value')}
        suffix={device?.measurableUnitString}
        onChange={(value, index) =>
          setFieldValue(value, {
            year,
            month,
            date: reading.readingDate!,
            index,
          })
        }
      />
    );

    const consumption = (
      <RenderReadingFields
        suffix={device?.measurableUnitString}
        values={getReadingValues('consumption')}
      />
    );

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

    if (!readings?.length) return null;

    return (isOpen ? readings : [readings[0]])?.map((reading, index) =>
      renderReading({ reading, month, isFirst: index === 0, arrowButton, year })
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
  grid-template-columns: 0.96fr 1fr 0.9fr 1.34fr 1fr;
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
  grid-template-columns: 1fr 1.2fr 0.9fr 1.5fr 1fr 0fr;
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
