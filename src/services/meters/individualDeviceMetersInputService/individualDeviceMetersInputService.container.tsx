import { IndividualDeviceReadingsResponse } from 'myApi';
import React, { FC, useCallback, useMemo } from 'react';
import { IndividualDeviceMetersInputContainerProps } from './individualDeviceMetersInputService.types';
import { getPreparedReadingsDictionary } from './individualDeviceMetersInputService.utils';
import { IndividualDeviceMetersInputLine } from './view/IndividualDeviceMetersInputLine';

export const IndividualDeviceMetersInputContainer: FC<IndividualDeviceMetersInputContainerProps> = ({
  device,
  sliderIndex,
  openReadingsHistoryModal: openReadingsHistoryModalById,
}) => {
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

  return (
    <IndividualDeviceMetersInputLine
      openReadingsHistoryModal={openReadingsHistoryModal}
      sliderIndex={sliderIndex}
      device={device}
      previousReading={previousReading}
      currentReading={currentReading}
    />
  );
};
