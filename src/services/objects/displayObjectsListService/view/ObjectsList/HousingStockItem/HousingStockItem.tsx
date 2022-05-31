import React, { FC } from 'react';
import { AdditionalAddress, Address, NumberOfTasks, Wrapper } from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
}) => {
  const additionalAddresses = housingStock.address?.additionalAddresses || [];

  const additionalAddressesString = additionalAddresses
    .map((elem) => `${elem.street}, ${elem.number}`)
    .join(' ');

  const numberOfTasks = housingStock.numberOfTasks && (
    <NumberOfTasks>
      
    </NumberOfTasks>
  );

  return (
    <Wrapper>
      <div>
        <Address>{housingStock.street} </Address>
        <AdditionalAddress>{additionalAddressesString}</AdditionalAddress>
      </div>
      <div>{housingStock.city}</div>
      <div>{housingStock.numberOfApartments}</div>
    </Wrapper>
  );
};
