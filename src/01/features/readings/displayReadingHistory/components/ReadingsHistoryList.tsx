import { useStore } from 'effector-react';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
} from 'myApi';
import React from 'react';
import { useOpenedYears } from '../hooks/useOpenedYears';
import { ReactComponent as ArrowIconTop } from '../icons/arrow.svg';
import { ReactComponent as ArrowBottom } from '../icons/arrowBottom.svg';
import { getActiveReadings } from './utils';
import {
  ArrowButton,
  GradientLoader,
  TableHeader,
  Wrapper,
  Year,
} from './styled';
import { ReadingLine } from './ReadingLine';
import { ConfirmReadingValueModal } from '../../readingsInput/confirmInputReadingModal';
import { ReadingsHistoryListProps } from './types';
import { useReadingHistoryValues } from '../hooks/useReadingValues';
import { fetchReadingHistoryFx } from '../models';

export const ReadingsHistoryList: React.FC<ReadingsHistoryListProps> = ({
  isModal,
  readonly = false,
}) => {
  const { values } = useReadingHistoryValues();
  const pendingHistory = useStore(fetchReadingHistoryFx.pending);

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
    readings,
    prevReading,
  }: IndividualDeviceReadingsMonthHistoryResponse & {
    year: number;
    prevReading?: IndividualDeviceReadingsItemHistoryResponse;
  }) => {
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

    const firstReadingline = (
      <ReadingLine
        {...{
          isReadonly: readonly,
          reading: previewReading,
          isFirst: true,
          arrowButton,
          year,
          month,
          readingsLength: readings.length,
          isHasArchived: readings.some((elem) => elem.isArchived),
          prevReading,
        }}
      />
    );

    return (
      <>
        {firstReadingline}
        {isOpen &&
          readings
            .filter((elem) => elem.isArchived)
            ?.map((reading) => (
              <ReadingLine
                {...{
                  isReadonly: readonly,
                  reading,
                  month,
                  isFirst: false,
                  arrowButton,
                  year,
                  readingsLength: readings.length,
                  isHasArchived: readings.some((elem) => elem.isArchived),
                }}
              />
            ))}
      </>
    );
  };

  const renderYear = ({
    year,
    monthReadings,
    prevMonths,
  }: IndividualDeviceReadingsYearHistoryResponse & {
    prevMonths?: IndividualDeviceReadingsMonthHistoryResponse[] | null;
  }) => {
    const isOpen = isYearOpen(year);

    return (
      <>
        <Year onClick={() => (isOpen ? closeYear : openYear)(year)}>
          <div>{year} год</div>
          <Arrow open={isOpen} />
        </Year>
        {isOpen &&
          monthReadings?.map((month, index) =>
            renderMonth({
              ...month,
              year,
              prevReading:
                getActiveReadings(monthReadings[index + 1]?.readings) ||
                getActiveReadings(prevMonths && prevMonths[0]?.readings),
            })
          )}
      </>
    );
  };

  return (
    <Wrapper isModal={isModal}>
      <GradientLoader loading={pendingHistory} />
      <ConfirmReadingValueModal />
      <TableHeader>
        {columnsNames.map((elem) => (
          <div>{elem}</div>
        ))}
      </TableHeader>
      {values?.yearReadings?.map((yearReading, index) =>
        renderYear({
          ...yearReading,
          prevMonths:
            values?.yearReadings &&
            values?.yearReadings[index + 1]?.monthReadings,
        })
      )}
    </Wrapper>
  );
};

const Arrow = ({ open }: { open?: boolean }) =>
  open ? <ArrowIconTop /> : <ArrowBottom />;

const columnsNames = [
  'Период',
  'Показания',
  'Потребление',
  'Ср. потребление',
  'Источник',
  'Последние показания',
];
