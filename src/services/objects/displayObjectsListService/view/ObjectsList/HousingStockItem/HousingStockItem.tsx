import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { Tooltip } from 'antd';
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
  const mainAddress = housingStock.address?.mainAddress;
  const additionalAddresses = housingStock.address?.additionalAddresses || [];

  const additionalAddressesString = additionalAddresses
    .map((elem) => `${elem.street}, ${elem.number}`)
    .join('; ');

  const numberOfTasks = Boolean(housingStock.numberOfTasks) && (
    <NumberOfTasks>
      <WarningIcon /> Задач: {housingStock.numberOfTasks}
    </NumberOfTasks>
  );

  return (
    <Wrapper to={`/objects/${housingStock.id}`}>
      <div>
        <Address>
          {mainAddress?.street}, {mainAddress?.number}
          {numberOfTasks}
        </Address>
        <Tooltip title={additionalAddressesString}>
          <AdditionalAddress>{additionalAddressesString}</AdditionalAddress>
        </Tooltip>
      </div>
      <div>{housingStock.city}</div>
      <div>{housingStock.houseType}</div>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
