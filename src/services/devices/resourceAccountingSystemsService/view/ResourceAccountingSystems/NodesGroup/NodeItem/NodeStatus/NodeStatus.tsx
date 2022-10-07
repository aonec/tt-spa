import React, { FC } from 'react';
import {
  NodeStatusIconsDictionary,
  NodeStatusTextDictionary,
} from './NodeStatus.constants';
import { IconWrapper, TextWrapper, Wrapper } from './NodeStatus.styled';
import { NodeStatusProps } from './NodeStatus.types';

export const NodeStatus: FC<NodeStatusProps> = ({ status }) => {
  const Icon = NodeStatusIconsDictionary[status];
  const text = NodeStatusTextDictionary[status];

  return (
    <Wrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <TextWrapper>{text}</TextWrapper>
    </Wrapper>
  );
};
