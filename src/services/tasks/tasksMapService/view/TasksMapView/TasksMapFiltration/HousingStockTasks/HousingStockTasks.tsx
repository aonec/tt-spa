import React, { FC } from 'react';
import {
  Address,
  ChevronIconSC,
  City,
  Header,
  HousingStockWrapper,
} from './HousingStockTasks.styled';
import { HousingStockTasksProps } from './HousingStockTasks.types';

export const HousingStockTasks: FC<HousingStockTasksProps> = ({
  selectedHousingStock,
}) => {
  const address = selectedHousingStock?.housingStock?.address?.mainAddress;

  return (
    <HousingStockWrapper>
      <Header>
        <ChevronIconSC />
        <Address>
          {`${address?.street}, ${address?.number}${address?.corpus || ''}`}
          <City>{`${address?.city}`}</City>
        </Address>
      </Header>
    </HousingStockWrapper>
  );
};
