import React, { FC } from 'react';
import {
  Header,
  Name,
  BrigadeMember,
  Wrapper,
  AvatarSC,
} from './BrigadeInfo.styled';
import { BrigadeInfoProps } from './BrigadeInfo.types';
import stc from 'string-to-color';
export const BrigadeInfo: FC<BrigadeInfoProps> = ({ brigadeInfo }) => {
  if (!brigadeInfo.length) return null;

  return (
    <Wrapper>
      <Header>Состав бригады</Header>
      {brigadeInfo.map((brigadeMember) => {
        const color = stc(brigadeMember.name);

        return (
          <BrigadeMember key={brigadeMember.erpId}>
            <AvatarSC color={color}>{brigadeMember.name?.[0]}</AvatarSC>
            <Name>{brigadeMember.name}</Name>
          </BrigadeMember>
        );
      })}
    </Wrapper>
  );
};
