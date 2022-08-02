import React, { FC } from 'react';
import { IndividualDeviceMetersInputContainerProps } from './individualDeviceMetersInputService.types';
import { IndividualDeviceMetersInput } from './view/IndividualDeviceMetersInput';

export const IndividualDeviceMetersInputContainer: FC<IndividualDeviceMetersInputContainerProps> = ({
  device,
}) => {
  return <IndividualDeviceMetersInput device={device} />;
};
