import React, { FC } from 'react';
import {
  Header,
  Name,
  BrigadeMember,
  Wrapper,
  AvatarSC,
} from './BrigadeInfo.styled';
import { BrigadeInfoProps } from './BrigadeInfo.types';
export const BrigadeInfo: FC<BrigadeInfoProps> = ({ brigadeInfo }) => {
  return (
    <Wrapper>
      <Header>Состав бригады</Header>
      {brigadeInfo.map((brigadeMember) => (
        <BrigadeMember key={brigadeMember.id}>
          <AvatarSC>{brigadeMember.name?.[0]}</AvatarSC>
          <Name>{brigadeMember.name}</Name>
        </BrigadeMember>
      ))}
    </Wrapper>
  );
};
