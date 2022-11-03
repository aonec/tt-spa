import React, { FC } from 'react';
import { ResourceIconLookup } from '../ResourceIconLookup';
import {
  IconWrapper,
  Model,
  SerialNumber,
  Wrapper,
} from './IndividualDeviceInfoShort.styled';
import { IndividualDeviceInfoShortProps } from './IndividualDeviceInfoShort.types';

export const IndividualDeviceInfoShort: FC<IndividualDeviceInfoShortProps> = ({
  device,
}) => {
  return (
    <Wrapper>
      <IconWrapper>
        {device.resource && <ResourceIconLookup resource={device.resource} />}
      </IconWrapper>
      <SerialNumber>{device.serialNumber}</SerialNumber>
      <Model>({device.model})</Model>
    </Wrapper>
  );
};
