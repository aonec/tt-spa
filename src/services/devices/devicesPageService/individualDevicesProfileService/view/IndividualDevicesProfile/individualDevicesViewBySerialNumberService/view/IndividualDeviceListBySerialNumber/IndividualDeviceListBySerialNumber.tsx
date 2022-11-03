import React, { FC } from 'react';
import { IndividualDeviceListItemBySerialNumber } from '../IndividualDeviceListItemBySerialNumber';
import { Wrapper } from './IndividualDeviceListBySerialNumber.styled';
import { IndividualDeviceListBySerialNumberProps } from './IndividualDeviceListBySerialNumber.types';

export const IndividualDeviceListBySerialNumber: FC<IndividualDeviceListBySerialNumberProps> = ({
  devices,
}) => {
  const list = devices.map((device) => (
    <IndividualDeviceListItemBySerialNumber device={device} />
  ));
  return <Wrapper>{list}</Wrapper>;
};
