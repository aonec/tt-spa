import React, { FC } from 'react';
import { Wrapper, Text } from './ActionButton.styled';
import { ActionButtonProps } from './ActionButton.types';

export const ActionButton: FC<ActionButtonProps> = ({ text, icon }) => {
  return (
    <Wrapper>
      {icon}
      <Text>{text}</Text>
    </Wrapper>
  );
};
