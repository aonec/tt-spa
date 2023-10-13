import React, { FC } from 'react';
import { Header, Wrapper } from './BrigadeInfo.styled';
import { BrigadeInfoProps } from './BrigadeInfo.types';
import { Avatar } from 'antd';

export const BrigadeInfo: FC<BrigadeInfoProps> = ({}) => {
  return (
    <Wrapper>
      <Header>Состав бригады</Header>
      
      <Avatar />
    </Wrapper>
  );
};
