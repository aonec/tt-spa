import React from 'react';
import { useUnit } from 'effector-react';
import { EIndividualDeviceRateType, EResourceType } from 'api/types';
import styled from 'styled-components';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { getInputBorderColor } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.styled';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';

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

const {
  outputs: { $individualDevice },
} = displayIndividualDeviceAndNamesService;

export const DeviceDataString: React.FC<Props> = ({
  device: deviceFromProps,
}) => {
  const { deviceFromStore } = useUnit({ deviceFromStore: $individualDevice });

  const device = deviceFromProps || deviceFromStore;

  if (!device) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {device?.resource && <ResourceIconLookup resource={device?.resource} />}
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
