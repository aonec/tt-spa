import React, { FC } from 'react';
import { Header, Title, Wrapper } from './CreateDistrictFormPanel.styled';
import { CreateDistrictFormPanelProps } from './CreateDistrictFormPanel.types';

export const CreateDistrictFormPanel: FC<CreateDistrictFormPanelProps> = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Выбранные адреса</Title>
      </Header>
    </Wrapper>
  );
};
