import { useStore } from 'effector-react';
import { IndividualDeviceReadingsResponse } from 'myApi';
import React, { FC, useCallback, useMemo } from 'react';
import { individualDeviceMetersInputService } from './individualDeviceMetersInputService.model';
import { IndividualDeviceMetersInputContainerProps } from './individualDeviceMetersInputService.types';
import {
  getInputIndex,
  getPreparedReadingsDictionary,
} from './individualDeviceMetersInputService.utils';
import { IndividualDeviceMetersInputLine } from './view/IndividualDeviceMetersInputLine';

const { outputs } = individualDeviceMetersInputService;

export const IndividualDeviceMetersInputContainer: FC<IndividualDeviceMetersInputContainerProps> = ({
  deviceIndex,
  device,
  sliderIndex,
  openReadingsHistoryModal: openReadingsHistoryModalById,
}) => {
  const devices = useStore(outputs.$devices);

  const { previousReading, currentReading } = useMemo(() => {
    const preparedReadingsData = getPreparedReadingsDictionary(
      device.readings || []
    );

    const previousReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[sliderIndex];
    const currentReading: IndividualDeviceReadingsResponse | undefined =
      preparedReadingsData[-1];

    return { previousReading, currentReading };
  }, [device.readings, sliderIndex]);

  const openReadingsHistoryModal = useCallback(
    () => openReadingsHistoryModalById(device.id),
    [openReadingsHistoryModalById]
  );

  const inputIndex = getInputIndex(deviceIndex, devices);

  return (
    <IndividualDeviceMetersInputLine
      inputIndex={inputIndex}
      openReadingsHistoryModal={openReadingsHistoryModal}
      sliderIndex={sliderIndex}
      device={device}
      previousReading={previousReading}
      currentReading={currentReading}
    />
  );
};
