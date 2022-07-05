import { useStore } from 'effector-react';
import moment from 'moment';
import { IndividualDeviceReadingsCreateRequest } from 'myApi';
import React, { FC, useCallback } from 'react';
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
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { useManagingFirmConsumptionRates } from 'services/meters/managementFirmConsumptionRatesService';
import {
  confirmReading,
  getNewReadingDate,
  getPreviousReadingByHistory,
  validateReadings,
} from './utils';
import { ArrowButtonBlock, Month, PreviousReading } from './styled';
import { ReadingLineProps } from './types';

export const ReadingLine: FC<ReadingLineProps> = ({
  year,
  reading,
  isFirst,
  month,
  arrowButton,
  isHasArchived,
  isReadonly,
}) => {
  const {
    values,
    setFieldValue,
    uploadingReadingsStatuses,
    uploadReading,
    deleteReading,
  } = useReadingHistoryValues();
  const device = useStore($individualDevice);

  const readingsHistory = values;

  const { managementFirmConsumptionRates } = useManagingFirmConsumptionRates(
    device?.managementFirmId
  );
  const rateNum = device && getIndividualDeviceRateNumByName(device.rateType);

  const WrapComponent = isFirst ? Month : PreviousReading;

  const monthName = isFirst ? (
    <span className="month-name">{getMonthName(month)}</span>
  ) : (
    <div></div>
  );

  const getReadingValues = useCallback(
    (type: 'value' | 'consumption' | 'averageConsumption') =>
      reading &&
      getReadingValuesArray(
        reading,
        type,
        getIndividualDeviceRateNumByName(device?.rateType!)
      ),
    [reading, device]
  );

  const createReading = useCallback(
    (values: (number | null)[]) => {
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
    },
    [device, reading, uploadReading, getReadingValuesObject]
  );

  const handleEnter = useCallback(
    (values: (number | null)[]) => {
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
        device
      );
    },
    [
      reading,
      readingsHistory,
      device,
      createReading,
      managementFirmConsumptionRates,
    ]
  );

  const readingsInputs = reading ? (
    <RenderReadingFields
      rateNum={rateNum}
      onEnter={handleEnter}
      status={uploadingReadingsStatuses[`${month}.${year}`]}
      editable={isFirst && !isReadonly}
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
