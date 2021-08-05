import React from 'react';
import { Flex } from '../Flex';

export const RightAlign: React.FC = ({ children }) => {
  return (
    <Flex style={{ justifyContent: 'space-between' }}>
      <div></div>
      <div>{children}</div>
    </Flex>
  );
};
