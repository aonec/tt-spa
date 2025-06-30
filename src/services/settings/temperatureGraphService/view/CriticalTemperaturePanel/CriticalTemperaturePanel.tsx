import React, { FC } from 'react';
import {
  Block,
  ButtonSc,
  TemperatureBlock,
  TemperatureDevider,
  TemperatureValue,
  Wrapper,
} from './CriticalTemperaturePanel.styled';
import { CriticalTemperaturePanelProps } from './CriticalTemperaturePanel.types';
import { PencilIcon, TemperatureIcon } from 'ui-kit/icons';

export const CriticalTemperaturePanel: FC<CriticalTemperaturePanelProps> = ({
  temperatureLimits,
  setEditDeviationModalOpen,
}) => {
  return (
    <Wrapper>
      <Block>
        <TemperatureIcon />
        Min и max отклонение от температурного графика
      </Block>
      <Block>
        <TemperatureBlock>
          <TemperatureValue>{temperatureLimits.min}%</TemperatureValue>
          <TemperatureDevider>/</TemperatureDevider>
          <TemperatureValue>{temperatureLimits.max}%</TemperatureValue>
        </TemperatureBlock>
        <ButtonSc
          size="s"
          type="ghost"
          onClick={() => setEditDeviationModalOpen(true)}
        >
          <PencilIcon />
        </ButtonSc>
      </Block>
    </Wrapper>
  );
};
