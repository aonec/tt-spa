import React, { FC } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import {
  AdditionalAddress,
  Address,
  NumberOfTasks,
  Wrapper,
} from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
}) => {
  const additionalAddresses = housingStock.address?.additionalAddresses || [];

  const additionalAddressesString = additionalAddresses
    .map((elem) => `${elem.street}, ${elem.number}`)
    .join(' ');

  const numberOfTasks = Boolean(housingStock.numberOfTasks) && (
    <NumberOfTasks>
      <WarningIcon /> Задач: {housingStock.numberOfTasks}
    </NumberOfTasks>
  );

  return (
    <Wrapper to={`/objects/${housingStock.id}`}>
      <div>
        <Address>
          {housingStock.street}, {housingStock.number}
        </Address>
        <AdditionalAddress>{additionalAddressesString}</AdditionalAddress>
        {numberOfTasks}
      </div>
      <div>{housingStock.city}</div>
      <div>Многоквартирный</div>
    </Wrapper>
  );
};
