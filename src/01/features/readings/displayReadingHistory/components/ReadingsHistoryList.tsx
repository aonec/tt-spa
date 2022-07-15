import { Flex } from '01/shared/ui/Layout/Flex';
import { useEvent, useStore } from 'effector-react';
import moment from 'moment';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'myApi';
import React from 'react';
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
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { ConfirmReadingValueModal } from '../../readingsInput/confirmInputReadingModal';
import {
  confirmReading,
  getActiveReadings,
  getNewReadingDate,
  getPreviousReadingByHistory,
  validateReadings,
} from './utils';
import {
  ArrowButton,
  ArrowButtonBlock,
  GradientLoader,
  Month,
  PreviousReading,
  TableHeader,
  Wrapper,
  Year,
} from './styled';
import { RenderReading } from './types';
import {
  CorrectReadingValuesValidationResult,
  round,
} from '01/hooks/useReadings';
import { openConfirmReadingModal } from '../../readingsInput/confirmInputReadingModal/models';
import { getMeasurementUnit } from '01/_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';
import {
  managementFirmConsumptionRatesService,
  useManagingFirmConsumptionRates,
} from 'services/meters/managementFirmConsumptionRatesService';

interface Props {
  isModal?: boolean;
  readonly?: boolean;
}

const { outputs, inputs } = managementFirmConsumptionRatesService;

export const ReadingsHistoryList: React.FC<Props> = ({ isModal, readonly }) => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
    deleteReading,
    resetValue,
  } = useReadingHistoryValues();
  const device = useStore($individualDevice);

  const readingsHistory = values;

  const pendingHistory = useStore(fetchReadingHistoryFx.pending);

  const consumptionRates = useStore(outputs.$consumptionRates);
  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates
  );

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    device?.managementFirmId
  );

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  const rateNum = device && getIndividualDeviceRateNumByName(device.rateType);

  const renderReading = ({
    year,
    reading,
    isFirst,
    month,
    arrowButton,
    isHasArchived,
  }: RenderReading) => {
    const WrapComponent = isFirst ? Month : PreviousReading;

    const monthName = isFirst ? (
      <span className="month-name">{getMonthName(month)}</span>
    ) : (
      <div></div>
    );

    const getReadingValues = (
      type: 'value' | 'consumption' | 'averageConsumption'
    ) =>
      reading &&
      getReadingValuesArray(
        reading,
        type,
        getIndividualDeviceRateNumByName(device?.rateType!)
      );

    const createReading = (values: (number | null)[]) => {
      if (!device?.id) return;

      const readingDate =
        reading?.readingDateTime || getNewReadingDate(month, year);

      uploadReading({
        ...getReadingValuesObject(
          values,
          getIndividualDeviceRateNumByName(device?.rateType!)
        ),
        deviceId: device?.id,
        readingDate,
      } as IndividualDeviceReadingsCreateRequest);
    };

    const handleEnter = (values: (number | null)[]) => {
      if (reading && values.every((elem) => elem === null)) {
        return deleteReading(reading.id);
      }

      const prevReading =
        readingsHistory &&
        getPreviousReadingByHistory(readingsHistory, { month, year });

      if (!(prevReading && device)) return createReading(values);

      const validationResult = validateReadings(
        getReadingValuesArray(prevReading, 'value', rateNum!).map((elem) =>
          typeof elem === 'string' ? Number(elem) : elem
        ),
        values,
        rateNum!,
        device?.resource!,
        managementFirmConsumptionRates
      );

      if (!validationResult || validationResult.validated) {
        return createReading(values);
      }

      return confirmReading(
        validationResult,
        () => createReading(values),
        () => resetValue({ year, month, id: reading?.id || null }),
        device
      );
    };

    const readingsInputs = reading ? (
      <RenderReadingFields
        rateNum={rateNum}
        onEnter={handleEnter}
        status={uploadingReadingsStatuses[`${month}.${year}`]}
        editable={isFirst && !readonly}
        values={getReadingValues('value') || []}
        suffix={device?.measurableUnitString}
        removed={reading.isRemoved}
        onChange={(value, index) =>
          setFieldValue(value, {
            year,
            month,
            id: reading.id,
            index,
          })
        }
      />
    ) : (
      <RenderReadingFields
        rateNum={rateNum}
        onEnter={handleEnter}
        editable={true}
        values={
          getReadingValues('value') ||
          getArrayByCountRange(
            getIndividualDeviceRateNumByName(device?.rateType! || 0),
            () => '' as any
          )
        }
        suffix={device?.measurableUnitString}
      />
    );

    const consumption = reading && (
      <RenderReadingFields
        rateNum={rateNum}
        suffix={device?.measurableUnitString}
        values={getReadingValues('consumption') || []}
        consumption
      />
    );

    const averageConsumption = reading && (
      <RenderReadingFields
        rateNum={rateNum}
        suffix={device?.measurableUnitString}
        values={getReadingValues('averageConsumption') || []}
        consumption
      />
    );

    const source = reading && (
      <SourceName sourceType={reading.source} user={reading.user} />
    );

    const uploadTime = reading && (
      <div>{moment(reading.uploadTime).format('DD.MM.YYYY HH:mm')}</div>
    );

    const arrowButtonComponent =
      isHasArchived && isFirst ? arrowButton : <ArrowButtonBlock />;

    return (
      <WrapComponent>
        {monthName}
        <div>{readingsInputs}</div>
        <div>{consumption}</div>
        <div>{averageConsumption}</div>
        <div>{source}</div>
        <div>{uploadTime}</div>
        {arrowButtonComponent}
      </WrapComponent>
    );
  };

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

    const firstReadingline = renderReading({
      reading: previewReading,
      isFirst: true,
      arrowButton,
      year,
      month,
      readingsLength: readings.length,
      isHasArchived: readings.some((elem) => elem.isArchived),
      prevReading,
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
                isHasArchived: readings.some((elem) => elem.isArchived),
              })
            )}
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
