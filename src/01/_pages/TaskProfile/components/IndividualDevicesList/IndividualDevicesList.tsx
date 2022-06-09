import React, { FC } from 'react';
import { IndividualDeviceItem } from './IndividualDeviceItem';
import {
  Wrapper,
  Title,
  Header,
  DevicesListWrap,
  StyledDeviceIcon,
} from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  devices,
}) => {
  const devicesList = devices.map((device) => (
    <IndividualDeviceItem device={device} key={device.id} />
  ));

  return (
    <Wrapper>
      <Header>
        <StyledDeviceIcon />
        <Title>Приборы</Title>
      </Header>
      <DevicesListWrap>{devicesList}</DevicesListWrap>
    </Wrapper>
  );
};
