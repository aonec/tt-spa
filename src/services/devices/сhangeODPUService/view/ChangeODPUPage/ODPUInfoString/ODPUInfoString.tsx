import React, { FC } from 'react';
import { ResourceIconLookup } from '../../../../../../ui-kit/shared_components/ResourceIconLookup';
import {
  DeviceInfoWrapper,
  ModelWrapper,
  SerialNumberWrapper,
} from './ODPUInfoString.styled';
import { ODPUInfoStringProps } from './ODPUInfoString.types';

export const ODPUInfoString: FC<ODPUInfoStringProps> = ({ device }) => {
  const { resource, serialNumber, model } = device;

  return (
    <DeviceInfoWrapper>
      {resource && <ResourceIconLookup resource={resource} />}
      <SerialNumberWrapper>{serialNumber}</SerialNumberWrapper>
      <ModelWrapper>{model}</ModelWrapper>
    </DeviceInfoWrapper>
  );
};
