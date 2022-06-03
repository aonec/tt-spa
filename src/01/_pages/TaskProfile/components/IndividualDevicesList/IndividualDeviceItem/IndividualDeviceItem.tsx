import React, { FC } from 'react';
import { IndividualDeviceInfo } from 'ui-kit/shared_components/IndividualDeviceInfo';
import { Wrapper } from './IndividualDeviceItem.styled';
import { IndividualDeviceItemProps } from './IndividualDeviceItem.types';

export const IndividualDeviceItem: FC<IndividualDeviceItemProps> = ({
  device,
}) => {
  return <Wrapper>
    <IndividualDeviceInfo device={device} />
  </Wrapper>;
};
