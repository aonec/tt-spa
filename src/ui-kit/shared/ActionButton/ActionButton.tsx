import React, { FC } from 'react';
import { Wrapper, Text } from './ActionButton.styled';
import { ActionButtonProps } from './ActionButton.types';

export const ActionButton: FC<ActionButtonProps> = ({
  text,
  icon,
  onClick,
  active,
}) => {
  return (
    <Wrapper onClick={onClick} active={active}>
      {icon}
      <Text>{text}</Text>
    </Wrapper>
  );
};
