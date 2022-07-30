import React from 'react';
import { Flex } from '../Flex';
import { RightAlignProps } from './RightAlign.types';

export const RightAlign: React.FC<RightAlignProps> = ({ children }) => {
  return (
    <Flex style={{ justifyContent: 'space-between' }}>
      <div></div>
      <div>{children}</div>
    </Flex>
  );
};
