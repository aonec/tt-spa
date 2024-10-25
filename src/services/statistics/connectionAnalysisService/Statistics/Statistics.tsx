import React, { FC } from 'react';
import {
  LeftBlock,
  RightBlock,
  TotalDevicesWrapper,
  Wrapper,
} from './Statistics.styled';
import { Props } from './Statistics.types';
import { DevicesPanel } from './DevicesPanel';
import { EConnectionStatusType } from 'api/types';

export const Statistics: FC<Props> = ({ calculatorsSortedList }) => {
  return (
    <Wrapper>
      <DevicesPanel panelTitle={EConnectionStatusType.Success} />
      <DevicesPanel panelTitle={EConnectionStatusType.NoConnection} />
      <DevicesPanel panelTitle={EConnectionStatusType.DeviceMalfunction} />
      <DevicesPanel panelTitle={EConnectionStatusType.UnstableConnection} />
      <DevicesPanel panelTitle={EConnectionStatusType.Unknown} />
    </Wrapper>
  );
};
