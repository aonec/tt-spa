import React from 'react';
import { useStore } from 'effector-react';
import { $individualDevice } from '../../displayIndividualDevice/models';
import { EResourceType } from 'myApi';
import DeviceIcons from '01/_components/DeviceIcons';
import { DeviceIcon } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import styled from 'styled-components';
import { Spaces } from '01/shared/ui/Layout/Space/Space';

export const DeviceDataString = () => {
  const device = useStore($individualDevice);

  if (!device) return <></>;

  return (
    <Spaces flex spaceStyles={{ width: 4 }}>
      <RenderDeviceIcon resource={device?.resource} />
      <DeviceName>{device.model}</DeviceName>
      <DeviceSerialNumber>{device.serialNumber}</DeviceSerialNumber>
    </Spaces>
  );
};

const DeviceName = styled.span`
  font-weight: 500;
  color: #272f5aee;
`;

const DeviceSerialNumber = styled.span`
  color: #272f5aaa;
  font-weight: 400;

  &:before {
    content: '(';
  }

  &:after {
    content: ')';
  }
`;

export const RenderDeviceIcon = ({
  resource,
}: {
  resource?: EResourceType;
}) => {
  if (!resource) return <></>;

  const deviceIcon = DeviceIcons[resource];

  if (!deviceIcon) return <></>;

  return (
    <DeviceIcon
      style={{ marginRight: 0 }}
      icon={deviceIcon.icon}
      fill={deviceIcon.color}
    />
  );
};
