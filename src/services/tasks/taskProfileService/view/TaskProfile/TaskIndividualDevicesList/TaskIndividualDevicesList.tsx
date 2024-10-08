import React, { FC, useMemo } from 'react';
import { DeviceIcon } from 'ui-kit/icons';
import { DevicesListItem } from './DevicesListItem';
import {
  HeaderWrapper,
  ListWrapper,
  TitleWrapper,
  Wrapper,
} from './TaskIndividualDevicesList.styled';
import { TaskIndividualDevicesListProps } from './TaskIndividualDevicesList.types';

export const TaskIndividualDevicesList: FC<TaskIndividualDevicesListProps> = ({
  devices,
  apartmentId,
}) => {
  const devicesList = useMemo(
    () =>
      devices.map((device) => (
        <DevicesListItem
          device={device}
          apartmentId={apartmentId}
          key={device.id}
        />
      )),
    [devices, apartmentId],
  );

  return (
    <Wrapper>
      <TitleWrapper>
        <DeviceIcon />
        <HeaderWrapper>Приборы</HeaderWrapper>
      </TitleWrapper>
      <ListWrapper>{devicesList}</ListWrapper>
    </Wrapper>
  );
};
