import React from 'react';
import {
  EResourceType,
  IndividualDeviceListResponseFromDevicePage,
} from 'api/types';
import styled from 'styled-components';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { getInputBorderColor } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';

interface Props {
  device?: IndividualDeviceListResponseFromDevicePage;
}

export const DeviceDataString: React.FC<Props> = ({
  device: deviceFromProps,
}) => {
  const device = deviceFromProps;

  if (!device) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {device.resourceType && (
        <ResourceIconLookup resource={device.resourceType} />
      )}
      {device.serialNumber && (
        <DeviceSerialNumber>{device.serialNumber}</DeviceSerialNumber>
      )}
      <DeviceName>{device.model}</DeviceName>
    </div>
  );
};

const DeviceName = styled.span`
  color: #272f5a66;
`;

const DeviceSerialNumber = styled.span`
  font-weight: 500;
  color: #272f5aee;
`;

export function getResourceColor(resource: EResourceType, index?: number) {
  if (resource === EResourceType.Electricity && index === 2) return '#957400E5';

  const color = getInputBorderColor({ resource });

  return color;
}
