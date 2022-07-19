import React, { FC } from 'react';
import {
  DeviceInfoWrapper,
  ModelWrapper,
  SerialNumberWrapper,
} from './ODPUInfoString.styled';
import { ODPUInfoStringProps } from './ODPUInfoString.types';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

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
