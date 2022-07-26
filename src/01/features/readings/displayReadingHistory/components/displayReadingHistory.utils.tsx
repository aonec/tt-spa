import React from 'react';
import { CorrectReadingValuesValidationResult } from '../../../../hooks/useReadings';
import { ConsumptionRatesDictionary } from 'services/meters/managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';
import {
  EResourceType,
  IndividualDeviceReadingsHistoryResponse,
  IndividualDeviceReadingsItemHistoryResponse,
  IndividualDeviceReadingsYearHistoryResponse,
  IndividualDeviceResponse,
} from '../../api/types';
import moment from 'moment';
import { getMeasurementUnit } from '01/_pages/MetersPage/components/MeterDevices/components/ReadingsBlock';
import { openConfirmReadingModal } from '../../readingsInput/confirmInputReadingModal/models';
import _ from 'lodash/fp';
import { round } from 'lodash';

export function getNewReadingDate(month: number, year: number) {
  const date = moment(`${15}.${month}.${year}`, 'DD.MM.YYYY');

  date.set('month', month - 2);

  return date.toISOString();
}

export function validateReadings(
  prevValues: (number | null)[],
  newValues: (number | null)[],
  rateNum: number,
  resource: EResourceType,
  limits?: ConsumptionRatesDictionary | null
) {
  const limit = limits && limits[resource]?.maximumConsumptionRate;

  if (!limit) return false;

  const res = newValues.reduce(
    (acc, elem, index) => {
      if (index + 1 > rateNum) return acc;

      const currentValue = Number(elem) || 0;
      const prevValue = Number(prevValues[index]) || 0;

      const isDown = currentValue < prevValue;
      const isUp = currentValue - prevValue > limit;
      const type: 'up' | 'down' | null = isUp ? 'up' : isDown ? 'down' : null;
      const difference = currentValue - prevValue;

      const validated = acc.validated && !isDown && !isUp;

      return {
        ...acc,
        validated,
        valuesValidationResults: [
          ...(acc.valuesValidationResults || []),
          {
            validated,
            index: index + 1,
            type,
            difference,
            currentValue,
            prevValue,
          },
        ],
      };
    },
    { validated: true, limit } as CorrectReadingValuesValidationResult
  );

  return res;
}

export function getActiveReadings(
  readings?: IndividualDeviceReadingsItemHistoryResponse[] | null
) {
  if (!readings) return null;

  return readings.find((elem) => !elem.isArchived) || null;
}

export function confirmReading(
  { valuesValidationResults, limit }: CorrectReadingValuesValidationResult,
  onSubmit: () => void,
  onCancel: () => void,
  device: IndividualDeviceResponse
) {
  const valueWarning = valuesValidationResults?.find((elem) =>
    Boolean(elem.type)
  );

  const unit = getMeasurementUnit(device.resource);

  if (valueWarning?.type === 'down') {
    const failedValidateReading = valuesValidationResults?.find(
      (elem) => !elem.validated
    );

    openConfirmReadingModal({
      title: (
        <>
          Введенное показание по прибору <b>{device.serialNumber}</b> (
          {device.model}) меньше предыдущего на T{failedValidateReading?.index}:{' '}
          <b>
            {Math.abs(round(failedValidateReading?.difference || 0, 3))} {unit}{' '}
          </b>
        </>
      ),
      onSubmit: () => void onSubmit(),
      onCancel: () => void onCancel(),
    });
    return;
  }

  openConfirmReadingModal({
    title: `${
      valueWarning?.type === 'up'
        ? `Расход ${round(
            valueWarning.difference,
            3
          )}${unit}, больше чем лимит ${limit}${unit}`
        : ''
    }`,
    onSubmit: () => void onSubmit(),
    onCancel: () => void onCancel(),
  });
}

export function getPreviousReadingByHistory(
  readingsHistoryRaw: IndividualDeviceReadingsHistoryResponse,
  address: { year: number; month: number }
): IndividualDeviceReadingsItemHistoryResponse | null {
  const readingsHistoryClone: IndividualDeviceReadingsHistoryResponse = _.cloneDeep(
    readingsHistoryRaw
  );
  const yearReadings = readingsHistoryClone?.yearReadings || [];
  const readingsHistoryCleared = yearReadings
    .map((yearReading) => {
      const monthReadings = yearReading.monthReadings || [];

      return monthReadings.map((monthReading) => {
        const activeReading = monthReading.readings?.find(
          (reading) => !reading.isArchived && !reading.isRemoved
        );

        return {
          reading: activeReading,
          month: monthReading.month,
          year: yearReading.year,
        };
      });
    })
    .flat();

  const currentIndex = readingsHistoryCleared?.reduce(
    (acc, readingsHistoryElement, index) =>
      readingsHistoryElement?.month === address.month &&
      readingsHistoryElement?.year === address.year
        ? index
        : acc,
    null as number | null
  );

  if (typeof currentIndex !== 'number') return null;

  const res =
    readingsHistoryCleared
      ?.slice(currentIndex + 1, readingsHistoryCleared.length)
      .find((elem) => Boolean(elem?.reading))?.reading || null;

  return res;
}
