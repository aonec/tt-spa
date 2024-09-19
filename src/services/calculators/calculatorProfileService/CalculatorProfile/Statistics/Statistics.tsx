import React, { FC } from 'react';
import { LeftBlock, RightBlock, TotalDevicesWrapper, Wrapper } from './Statistics.styled';
import { PanelTitle, Props } from './Statistics.types';
import { DeviceIcon } from 'ui-kit/icons';
import { DevicesPanel } from './DevicesPanel';

export const Statistics: FC<Props> = ({}) => {
  return (
    <Wrapper>
      <TotalDevicesWrapper>
        <LeftBlock>
            <DeviceIcon/>
            Всего приборов
        </LeftBlock>
        <RightBlock>100</RightBlock>
      </TotalDevicesWrapper>

      <DevicesPanel panelTitle={PanelTitle.Normal}/>
      <DevicesPanel panelTitle={PanelTitle.NoArchives}/>
    </Wrapper>
  );
};
