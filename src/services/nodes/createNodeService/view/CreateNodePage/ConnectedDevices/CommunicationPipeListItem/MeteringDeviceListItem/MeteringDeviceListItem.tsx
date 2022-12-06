import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Wrapper } from './MeteringDeviceListItem.styled';
import { MeteringDeviceListItemProps } from './MeteringDeviceListItem.types';

export const MeteringDeviceListItem: FC<MeteringDeviceListItemProps> = ({
  resource,
  device,
}) => {
  return (
    <Wrapper>
      <ResourceIconLookup resource={resource} />
      <div>{device.serialNumber}</div>
      <div>({device.model})</div>
    </Wrapper>
  );
};
