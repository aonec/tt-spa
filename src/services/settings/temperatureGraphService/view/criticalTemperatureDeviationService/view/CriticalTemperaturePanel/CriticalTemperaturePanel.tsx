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

export const CriticalTemperaturePanel: FC<
  CriticalTemperaturePanelProps
> = () => {
  return (
    <Wrapper>
      <Block>
        <TemperatureIcon />
        Критичное отклонение температуры обратной магистрали от графика
      </Block>
      <Block>
        <TemperatureBlock>
          <TemperatureValue>5°C</TemperatureValue>
          <TemperatureDevider>/</TemperatureDevider>
          <TemperatureValue>10°C</TemperatureValue>
        </TemperatureBlock>
        <ButtonSc size="small" type="ghost">
          <PencilIcon />
        </ButtonSc>
      </Block>
    </Wrapper>
  );
};
