import React, { FC } from 'react';
import { ResourceIconLookup } from '../ResourceIconLookup';
import { DeviceStatus } from './DeviceStatus';
import { Model, SerialNumber, Wrapper } from './IndividualDeviceInfo.styled';
import { IndividualDeviceInfoProps } from './IndividualDeviceInfo.types';

export const IndividualDeviceInfo: FC<IndividualDeviceInfoProps> = ({
  device,
}) => {
  const isActive = device.closingDate === null;
  const closingReason = device.closingReason;

  return (
    <Wrapper>
      <ResourceIconLookup icon={device.resource} />
      <SerialNumber>{device.serialNumber}</SerialNumber>
      <Model>({device.model})</Model>
      <DeviceStatus isActive={isActive} closingReason={closingReason} />
    </Wrapper>
  );
};
