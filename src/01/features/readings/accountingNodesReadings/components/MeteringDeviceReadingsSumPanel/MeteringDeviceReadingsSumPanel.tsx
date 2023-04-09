import React, { FC } from 'react';
import {
  Panel,
  Wrapper,
  TextWrapper,
} from './MeteringDeviceReadingsSumPanel.styled';
import { MeteringDeviceReadingsSumPanelProps } from './MeteringDeviceReadingsSumPanel.types';

export const MeteringDeviceReadingsSumPanel: FC<MeteringDeviceReadingsSumPanelProps> = ({
  sum,
}) => {
  return (
    <Wrapper>
      <Panel>
        <TextWrapper>Расход по всем узлам учёта</TextWrapper>
        <TextWrapper>{sum || '-'} кВтч</TextWrapper>
      </Panel>
    </Wrapper>
  );
};
