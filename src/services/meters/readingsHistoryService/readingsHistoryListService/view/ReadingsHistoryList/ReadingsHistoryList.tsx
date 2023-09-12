import React, { FC, useCallback } from 'react';
import dayjs from 'api/dayjs';
import _ from 'lodash';
import {
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsMonthHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'api/types';
import { RenderReadingFields } from './ReadingFields';
import { SourceName } from './SourceName/SourceName';
import {
  getMonthName,
  getReadingValuesArray,
  getReadingValuesObject,
} from '../../../utils';
import {
  confirmReading,
  getActiveReadings,
  getNewReadingDate,
  getPreviousReadingByHistory,
  getRecentlyReplacedAccount,
  validateReadings,
} from '../../readingsHistoryListService.utils';
import {
  ArrowButton,
  ArrowButtonBlock,
  Month,
  PreviousReading,
  TableHeader,
  Wrapper,
  Year,
} from './ReadingsHistoryList.styled';
import { RenderReading } from '../../readingsHistoryListService.types';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import { ReplacedAccountAlert } from './ReplacedAccountAlert';
import { getMeasurementUnit } from 'services/meters/individualDeviceMetersInputService/individualDeviceMetersInputService.utils';
import { getFilledArray } from 'utils/getFilledArray';
import { ConfirmReadingValueContainer } from '../../../confirmReadingService';
import { ReadingsHistoryListProps } from './ReadingsHistoryList.types';
import { columnsNames } from './ReadingsHistoryList.constants';
import { Arrow } from './Arrow';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const ReadingsHistoryList: FC<ReadingsHistoryListProps> = ({
  readonly,
  device,
  apartment,
  readingsHistory,
  setFieldValue,
  uploadingReadingsStatuses,
  uploadReading,
  deleteReading,
  resetValue,
  pendingHistory,
  rateNum,
  managementFirmConsumptionRates,
  isYearOpen,
  openYear,
  closeYear,
  openMonth,
  closeMonth,
  isMonthOpen,
  isModal,
}) => {
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
        <div>{getTimeStringByUTC(reading.uploadTime)}</div>
      );

      const arrowButtonComponent =
        isHasArchived && isFirst ? arrowButton : <ArrowButtonBlock />;

      const actualHomeownerAccount = _.last(apartment?.homeownerAccounts);

      const recentlyReplacedAccount = getRecentlyReplacedAccount(
        apartment?.homeownerAccounts || [],
        actualHomeownerAccount,
      );

      const accountLastChangeYear = dayjs(
        actualHomeownerAccount?.openAt,
      ).year();
      const accountLastChangeMonth = dayjs(actualHomeownerAccount?.openAt)
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
            <Arrow open={isOpen || false} />
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
    <WithLoader isLoading={pendingHistory}>
      <Wrapper isModal={isModal}>
        <ConfirmReadingValueContainer />
        <TableHeader>
          {columnsNames.map((elem) => (
            <div>{elem}</div>
          ))}
        </TableHeader>
        {readingsHistory?.yearReadings?.map((yearReading, index) =>
          renderYear({
            ...yearReading,
            prevMonths:
              readingsHistory?.yearReadings &&
              readingsHistory?.yearReadings[index + 1]?.monthReadings,
          }),
        )}
      </Wrapper>
    </WithLoader>
  );
};
