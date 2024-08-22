import React, { FC } from 'react';
import { Line, Wrapper } from './SpaceLine.styled';
import { SpaceLineProps } from './SpaceLine.types';

export const SpaceLine: FC<SpaceLineProps> = ({
  noTop = false,
  noPadding = false,
}) => (
  <Wrapper noTop={noTop} noPadding={noPadding}>
    <Line />
  </Wrapper>
);
