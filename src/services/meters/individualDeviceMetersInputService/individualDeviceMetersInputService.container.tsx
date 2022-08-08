import { useStore } from 'effector-react';
import {
  IndividualDeviceReadingsCreateRequest,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import React, { FC, useCallback, useMemo } from 'react';
import { individualDeviceMetersInputService } from './individualDeviceMetersInputService.model';
import {
  IndividualDeviceMetersInputContainerProps,
  MeterInputUploadReadingPayload,
  UploadReading,
} from './individualDeviceMetersInputService.types';
import {
  getInputIndex,
  getPreparedReadingsDictionary,
  validateReadings,
} from './individualDeviceMetersInputService.utils';
import { IndividualDeviceMetersInputLine } from './view/IndividualDeviceMetersInputLine';
import { getRateNum } from './view/MetersInputsBlock/MetersInputsBlock.utils';

const { outputs } = individualDeviceMetersInputService;

export const IndividualDeviceMetersInputContainer: FC<IndividualDeviceMetersInputContainerProps> = ({
  deviceIndex,
  device,
  sliderIndex,
  openReadingsHistoryModal: openReadingsHistoryModalById,
  managementFirmConsumptionRates,
}) => {
  const devices = useStore(outputs.$devices);

  const {
    previousReading,
    currentReading,
    preparedReadingsData,
  } = useMemo(() => {
    const preparedReadingsData = getPreparedReadingsDictionary(
      device.readings || []
    );

    const previousReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[sliderIndex];
    const currentReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[-1];

    return { previousReading, currentReading, preparedReadingsData };
  }, [device.readings, sliderIndex]);

  const openReadingsHistoryModal = useCallback(
    () => openReadingsHistoryModalById(device.id),
    [openReadingsHistoryModalById]
  );

  const inputIndex = useMemo(() => getInputIndex(deviceIndex, devices), [
    deviceIndex,
    devices,
  ]);

  const deviceRateNum = getRateNum(device.rateType);

  const consumptionRate = useMemo(() => {
    if (!managementFirmConsumptionRates) return null;

    return managementFirmConsumptionRates[device.resource];
  }, [managementFirmConsumptionRates, device]);

  const handleUploadReading: UploadReading = useCallback(
    async (
      readingPayload: MeterInputUploadReadingPayload,
      isPrevious?: boolean
    ) => {
      const result = validateReadings(
        isPrevious ? sliderIndex : -1,
        readingPayload,
        deviceRateNum,
        consumptionRate,
        preparedReadingsData
      );

      console.log(result);

      if (result) throw result;
    },
    [consumptionRate, preparedReadingsData, deviceRateNum, sliderIndex]
  );

  return (
    <IndividualDeviceMetersInputLine
      inputIndex={inputIndex}
      openReadingsHistoryModal={openReadingsHistoryModal}
      sliderIndex={sliderIndex}
      device={device}
      previousReading={previousReading}
      currentReading={currentReading}
      handleUploadReading={handleUploadReading}
    />
  );
};
