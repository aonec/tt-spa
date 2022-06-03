import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import React, { FC } from 'react';
import { DeviceIcon } from 'ui-kit/icons';
import { IndividualDeviceItem } from './IndividualDeviceItem';
import {
  Wrapper,
  Title,
  Header,
  DevicesListWrap,
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
        <DeviceIcon style={{ transform: 'scale(1.2)' }} />
        <Title>Приборы</Title>
      </Header>
      <DevicesListWrap>{devicesList}</DevicesListWrap>
    </Wrapper>
  );
};
