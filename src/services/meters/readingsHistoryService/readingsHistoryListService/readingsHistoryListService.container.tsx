import { useEvent, useStore } from 'effector-react';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'myApi';
import React, { useCallback, useMemo } from 'react';
import { useOpenedYears } from './hooks/useOpenedYears';
import { RenderReadingFields } from './ReadingFields';
import { SourceName } from './SourceIcon';
import {
  getMonthName,
  getReadingValuesArray,
  getReadingValuesObject,
} from '../utils';
import { useReadingHistoryValues } from './hooks/useReadingValues';
import {
  confirmReading,
  getActiveReadings,
  getNewReadingDate,
  getPreviousReadingByHistory,
  getRecentlyReplacedAccount,
  validateReadings,
} from './readingsHistoryListService.utils';
import {
  ArrowButton,
  ArrowButtonBlock,
  GradientLoader,
  Month,
  PreviousReading,
  TableHeader,
  Wrapper,
  Year,
} from './readingsHistoryListService.styled';
import { RenderReading } from './readingsHistoryListService.types';
import {
  managementFirmConsumptionRatesService,
  useManagingFirmConsumptionRates,
} from 'services/meters/managementFirmConsumptionRatesService';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import moment from 'moment';
import { ReplacedAccountAlert } from './ReplacedAccountAlert';
import _ from 'lodash';
import { getMeasurementUnit } from 'services/meters/individualDeviceMetersInputService/individualDeviceMetersInputService.utils';
import { getFilledArray } from 'utils/getFilledArray';
import { apartmentService } from 'services/apartments/apartmentService/apartmentService.models';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';
import { ArrowBottom, ArrowIconTop } from 'ui-kit/icons';
import { readingsHistoryService } from '../readingsHistoryService.model';
import { ConfirmReadingValueContainer } from '../confirmReadingService';

const {
  outputs: { $individualDevice },
} = displayIndividualDeviceAndNamesService;
interface Props {
  isModal?: boolean;
  readonly?: boolean;
}

const { outputs, inputs } = managementFirmConsumptionRatesService;

export const ReadingsHistoryList: React.FC<Props> = ({
  isModal = true,
  readonly,
}) => {
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

  const pendingHistory = useStore(
    readingsHistoryService.outputs.$isReadingsHistoryLoading,
  );

  const consumptionRates = useStore(outputs.$consumptionRates);
  const loadConsumptionRates = useEvent(
    inputs.loadManagemenFirmConsumptionRates,
  );

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    consumptionRates,
    loadConsumptionRates,
    device?.managementFirmId,
  );

  const {
    isYearOpen,
    openYear,
    closeYear,
    openMonth,
    closeMonth,
    isMonthOpen,
  } = useOpenedYears(values?.yearReadings || []);

  const rateNum = useMemo(
    () => device && getIndividualDeviceRateNumByName(device.rateType),
    [device],
  );

  const apartment = useStore(apartmentService.outputs.$apartment);

  const renderReading = useCallback(
    ({
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
        type: 'value' | 'consumption' | 'averageConsumption',
      ) =>
        reading &&
        getReadingValuesArray(
          reading,
          type,
          getIndividualDeviceRateNumByName(device?.rateType!),
        );

      const createReading = (values: (number | null)[]) => {
        if (!device?.id) return;

        const readingDate =
          reading?.readingDateTime || getNewReadingDate(month, year);

        uploadReading({
          ...getReadingValuesObject(
            values,
            getIndividualDeviceRateNumByName(device?.rateType!),
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
            typeof elem === 'string' ? Number(elem) : elem,
          ),
          values,
          rateNum!,
          device?.resource!,
          managementFirmConsumptionRates,
        );

        if (!validationResult || validationResult.validated) {
          return createReading(values);
        }

        return confirmReading(
          validationResult,
          () => createReading(values),
          () => resetValue({ year, month, id: reading?.id || null }),
          device,
        );
      };

      const measurementUnit =
        device?.resource && getMeasurementUnit(device?.resource);

      const readingsInputs = reading ? (
        <RenderReadingFields
          rateNum={rateNum}
          onEnter={handleEnter}
          status={uploadingReadingsStatuses[`${month}.${year}`]}
          editable={isFirst && !readonly}
          values={getReadingValues('value') || []}
          suffix={measurementUnit}
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
            getFilledArray(
              getIndividualDeviceRateNumByName(device?.rateType! || 0),
              () => '' as any,
            )
          }
          suffix={measurementUnit}
        />
      );

      const consumption = reading && (
        <RenderReadingFields
          rateNum={rateNum}
          suffix={measurementUnit}
          values={getReadingValues('consumption') || []}
          consumption
        />
      );

      const averageConsumption = reading && (
        <RenderReadingFields
          rateNum={rateNum}
          suffix={measurementUnit}
          values={getReadingValues('averageConsumption') || []}
          consumption
        />
      );

      const source = reading && (
        <SourceName sourceType={reading.source} user={reading.user} />
      );

      const entryDate = reading && (
        <div>{getTimeStringByUTC(reading.entryDate)}</div>
      );

      const arrowButtonComponent =
        isHasArchived && isFirst ? arrowButton : <ArrowButtonBlock />;

      const actualHomeownerAccount = _.last(apartment?.homeownerAccounts);

      const recentlyReplacedAccount = getRecentlyReplacedAccount(
        apartment?.homeownerAccounts || [],
        actualHomeownerAccount,
      );

      const accountLastChangeYear = moment(
        actualHomeownerAccount?.openAt,
      ).year();
      const accountLastChangeMonth = moment(actualHomeownerAccount?.openAt)
        .set('day', 15)
        .month();

      const isShowReplaceAccountAlert =
        year === accountLastChangeYear &&
        month === accountLastChangeMonth &&
        Boolean(recentlyReplacedAccount) &&
        isFirst;

      return (
        <>
          {isShowReplaceAccountAlert && (
            <ReplacedAccountAlert
              recentlyReplacedAccount={recentlyReplacedAccount!}
            />
          )}
          <WrapComponent>
            {monthName}
            <div>{readingsInputs}</div>
            <div>{consumption}</div>
            <div>{averageConsumption}</div>
            <div>{source}</div>
            <div>{entryDate}</div>
            {arrowButtonComponent}
          </WrapComponent>
        </>
      );
    },
    [
      rateNum,
      uploadReading,
      managementFirmConsumptionRates,
      readonly,
      resetValue,
      setFieldValue,
      deleteReading,
      device,
      readingsHistory,
      apartment?.homeownerAccounts,
      uploadingReadingsStatuses,
    ],
  );

  const renderMonth = useCallback(
    ({
      month,
      year,
      readings,
      prevReading,
    }: IndividualDeviceReadingsMonthHistoryResponse & {
      year: number;
      prevReading?: IndividualDeviceReadingsItemHistoryResponse | null;
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

      const previewReading =
        readings.find((elem) => !elem.isArchived) || void 0;

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
                }),
              )}
        </>
      );
    },
    [closeMonth, renderReading, isMonthOpen, openMonth],
  );

  const renderYear = useCallback(
    ({
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
              }),
            )}
        </>
      );
    },
    [closeYear, isYearOpen, openYear, renderMonth],
  );

  return (
    <Wrapper isModal={isModal}>
      <GradientLoader loading={pendingHistory} />
      <ConfirmReadingValueContainer />
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
        }),
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
