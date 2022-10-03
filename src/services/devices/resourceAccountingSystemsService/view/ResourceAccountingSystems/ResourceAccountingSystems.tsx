import React, { FC } from 'react';
import { Header, Title, Wrapper } from './ResourceAccountingSystems.styled';
import { ResourceAccountingSystemsProps } from './ResourceAccountingSystems.types';

export const ResourceAccountingSystems: FC<ResourceAccountingSystemsProps> = ({}) => {
  return (
    <Wrapper>
      <Header>
        <Title>Системы учета ресурсов</Title>
      </Header>
    </Wrapper>
  );
};
