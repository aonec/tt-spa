import React, { FC } from 'react';
import { round } from 'utils/round';
import {
  Panel,
  TextWrapper,
  Wrapper,
} from './HousingDevicesConsumptionPanel.styled';
import { HousingDevicesConsumptionPanelProps } from './HousingDevicesConsumptionPanel.types';

export const HousingDevicesConsumptionPanel: FC<
  HousingDevicesConsumptionPanelProps
> = ({ count }) => {
  return (
    <Wrapper>
      <Panel>
        <TextWrapper>Расход по всем общедомовым приборам</TextWrapper>
        <TextWrapper isBold>{round(count, 3)} кВт/ч</TextWrapper>
      </Panel>
    </Wrapper>
  );
};
