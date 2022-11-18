import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Header, HeaderTitle, Wrapper } from './CreateObjectPage.styled';
import { CreateObjectPageProps } from './CreateObjectPage.types';

export const CreateObjectPage: FC<CreateObjectPageProps> = ({}) => {
  return (
    <Wrapper>
      <Header>
        <GoBack />
        <HeaderTitle>Добавление нового объекта</HeaderTitle>
      </Header>
      
    </Wrapper>
  );
};
