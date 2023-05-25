import React, { FC } from 'react';
import { Header, Title, Wrapper } from './CreateDistrictFormPanel.styled';
import { CreateDistrictFormPanelProps } from './CreateDistrictFormPanel.types';

export const CreateDistrictFormPanel: FC<CreateDistrictFormPanelProps> = ({
  housingStocksInDistrict,
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>Выбранные адреса</Title>
      </Header>
      {housingStocksInDistrict.map((elem) => (
        <div>
          {elem.address?.mainAddress?.street}
          {', '}
          {elem.address?.mainAddress?.number}
        </div>
      ))}
    </Wrapper>
  );
};
