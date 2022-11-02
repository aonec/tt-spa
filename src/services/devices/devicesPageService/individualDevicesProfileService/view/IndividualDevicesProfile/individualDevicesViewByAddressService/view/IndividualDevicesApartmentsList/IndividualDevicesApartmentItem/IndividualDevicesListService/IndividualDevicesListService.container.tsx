import React, { FC } from 'react';
import { IndividualDevicesListContainerProps } from './individualDevicesListService.types';
import { IndividualDevicesList } from './view/IndividualDevicesList';

export const IndividualDevicesListContainer: FC<IndividualDevicesListContainerProps> = () => {
  return <IndividualDevicesList />;
};
