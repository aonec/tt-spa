import React, { FC } from 'react';
import { IndividualDeviceMetersInputContainerProps } from './individualDeviceMetersInputService.types';
import { IndividualDeviceMetersInputLine } from './view/IndividualDeviceMetersInputLine';

export const IndividualDeviceMetersInputContainer: FC<IndividualDeviceMetersInputContainerProps> = ({
  device,
  sliderIndex,
}) => {
  return (
    <IndividualDeviceMetersInputLine
      sliderIndex={sliderIndex}
      device={device}
    />
  );
};
