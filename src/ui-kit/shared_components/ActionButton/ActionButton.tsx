import React, { FC } from 'react';
import { Wrapper, Text } from './ActionButton.styled';
import { ActionButtonProps } from './ActionButton.types';

export const ActionButton: FC<ActionButtonProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick}>
      {icon}
      <Text>{text}</Text>
    </Wrapper>
  );
};
