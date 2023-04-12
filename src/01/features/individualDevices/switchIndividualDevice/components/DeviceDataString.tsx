import React from 'react';
import { useStore } from 'effector-react';
import { $individualDevice } from '../../displayIndividualDevice/models';
import { EIndividualDeviceRateType, EResourceType } from 'myApi';
import DeviceIcons from '01/_components/DeviceIcons';
import styled from 'styled-components';
import { Spaces } from '01/shared/ui/Layout/Space/Space';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

export interface DataStringDevice {
  resource: EResourceType | null;
  model: string | null;
  serialNumber: string | null;
  measurableUnitString?: string | null;
  rateType?: EIndividualDeviceRateType;
}

interface Props {
  device?: DataStringDevice;
}

export const DeviceDataString: React.FC<Props> = ({
  device: deviceFromProps,
}) => {
  const deviceFromStore = useStore($individualDevice);

  const device = deviceFromProps || deviceFromStore;

  if (!device) return null;

  return (
    <Spaces flex spaceStyles={{ width: 4 }}>
      {device?.resource && <ResourceIconLookup resource={device?.resource} />}
      {device.serialNumber && (
        <DeviceSerialNumber>{device.serialNumber}</DeviceSerialNumber>
      )}
      <DeviceName>{device.model}</DeviceName>
    </Spaces>
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

  const { color } = DeviceIcons[resource];

  return color;
}
