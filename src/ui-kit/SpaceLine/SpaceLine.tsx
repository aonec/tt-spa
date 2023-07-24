import React, { FC } from 'react';
import { Line, Wrapper } from './SpaceLine.styled';
import { SpaceLineProps } from './SpaceLine.types';

export const SpaceLine: FC<SpaceLineProps> = ({ noTop = false }) => (
  <Wrapper noTop={noTop}>
    <Line />
  </Wrapper>
);
