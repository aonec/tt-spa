import { Flex } from '01/shared/ui/Layout/Flex';
import { useStore } from 'effector-react';
import moment from 'moment';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'myApi';
import React from 'react';
import styled, { keyframes } from 'styled-components';
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
import { fetchReadingHistoryFx } from '../models';

interface Props {
  isModal?: boolean;
  readonly?: boolean;
}

export const ReadingsHistoryList: React.FC<Props> = ({ isModal, readonly }) => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
  } = useReadingHistoryValues();
  const device = useStore($individualDevice);

  const pendingHistory = useStore(fetchReadingHistoryFx.pending);

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  interface RenderReading {
    reading?: IndividualDeviceReadingsItemHistoryResponse;
    isFirst?: boolean;
    arrowButton?: React.ReactElement;
    month: number;
    year: number;
    readingsLength: number;
  }

  const renderReading = ({
    year,
    reading,
    isFirst,
    month,
    arrowButton,
    readingsLength,
  }: RenderReading) => {
    const WrapComponent = isFirst ? Month : PreviousReading;

    const monthName = isFirst ? (
      <span className="month-name">{getMonthName(month)}</span>
    ) : (
      <div></div>
    );

    const getReadingValues = (type: 'value' | 'consumption') =>
      reading &&
      getReadingValuesArray(
        reading,
        type,
        getIndividualDeviceRateNumByName(device?.rateType!)
      );
    const readings = reading && (
      <RenderReadingFields
        onBlur={() =>
          uploadReading(
            {
              ...getReadingValuesObject(
                reading,
                getIndividualDeviceRateNumByName(device?.rateType!)
              ),
              deviceId: device?.id!,
              readingDate: reading.readingDateTime || moment().toISOString(true),
              isForced: true,
            } as any,
            { year, month, id: reading.id }
          )
        }
        status={uploadingReadingsStatuses[reading.readingDateTime || '']}
        editable={isFirst && !readonly}
        values={getReadingValues('value') || []}
        suffix={device?.measurableUnitString}
        onChange={(value, index) =>
          setFieldValue(value, {
            year,
            month,
            id: reading.id,
            index,
          })
        }
      />
    );

    const consumption = reading && (
      <RenderReadingFields
        suffix={device?.measurableUnitString}
        values={getReadingValues('consumption') || []}
        consumption
      />
    );

    const source = reading && (
      <SourceName sourceType={reading.source} user={reading.user} />
    );

    const uploadTime = reading && (
      <div>{moment(reading.uploadTime).format('DD.MM.YYYY hh:mm')}</div>
    );

    const arrowButtonComponent =
      !readings || (isFirst && readingsLength > 1) ? (
        arrowButton
      ) : (
        <ArrowButtonBlock />
      );

    return (
      <WrapComponent>
        {monthName}
        {readings || <div></div>}
        {consumption || <div></div>}
        {source || <div></div>}
        {uploadTime || <div></div>}
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

    const previewReading = readings.find((elem) => !elem.isArchived) || void 0;

    const firstReadingline = renderReading({
      reading: previewReading,
      isFirst: true,
      arrowButton,
      year,
      month,
      readingsLength: readings.length,
    });

    return (
      <>
        {firstReadingline}
        {isOpen &&
          readings
            .filter((elem) => elem.isArchived)
            ?.map((reading) =>
              renderReading({
                reading,
                month,
                isFirst: false,
                arrowButton,
                year,
                readingsLength: readings.length,
              })
            )}
      </>
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
    <Wrap isModal={isModal}>
      <GradientLoader loading={pendingHistory} />
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

const slide = keyframes`
  0% {
		background-position: 100% 0%;
	}
	100% {
		background-position: 0% 0%;
	} 
  }
	} 
`;

const GradientLoader = styled.div`
  background: ${(props: { loading: boolean }) =>
    props.loading
      ? `repeating-linear-gradient(
    45deg,
    #e8ebff,
    #e8ebff 10px,
    #7584d6 10px,
    #7584d6 20px
  )`
      : 'none'};
  height: 5px;
  background-size: 400% 400%;
  animation: ${slide} 40s linear infinite;
  transform: scale(1, -1);
`;

interface WrapProps {
  isModal?: boolean;
}

const Wrap = styled.div`
  max-width: 960px;
  ${({ isModal }: WrapProps) =>
    isModal
      ? `

    max-height: 620px;
    overflow-y: auto;
  
  `
      : ''}
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
