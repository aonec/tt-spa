import React, { FC } from 'react';
import {
  Block,
  ButtonSc,
  TemperatureValue,
  Wrapper,
} from './CriticalTemperaturePanel.styled';
import { CriticalTemperaturePanelProps } from './CriticalTemperaturePanel.types';
import { PencilIcon, TemperatureIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';

export const CriticalTemperaturePanel: FC<
  CriticalTemperaturePanelProps
> = ({}) => {
  return (
    <Wrapper>
      <Block>
        <TemperatureIcon />
        Критичное отклонение температуры обратной магистрали от графика
      </Block>
      <Block>
        <TemperatureValue>5°C</TemperatureValue>
        <ButtonSc size="small" type="ghost">
          <PencilIcon />
        </ButtonSc>
      </Block>
    </Wrapper>
  );
};
