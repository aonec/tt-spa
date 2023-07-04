import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import {
  AdditionalAddress,
  Address,
  NumberOfTasks,
  Wrapper,
} from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';
import { HouseCategoryDictionary } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectMainInfoStage/createObjectMainInfoStage.constants';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
}) => {
  const address = getHousingStockAddress(housingStock);
  const mainAddress = housingStock.address?.mainAddress;

  const additionalAddressesString = useMemo(() => {
    const additionalAddresses = housingStock.address?.additionalAddresses || [];

    return additionalAddresses
      .map((elem) => `${elem.street}, ${elem.number}`)
      .join('; ');
  }, [housingStock.address]);

  const numberOfTasks = useMemo(() => {
    return (
      Boolean(housingStock.numberOfTasks) && (
        <NumberOfTasks>
          <WarningIcon /> Задач: {housingStock.numberOfTasks}
        </NumberOfTasks>
      )
    );
  }, [housingStock.numberOfTasks]);

  return (
    <Wrapper to={`/objects/profile/${housingStock.id}`}>
      <div>
        <Address>
          {address}
          {numberOfTasks}
        </Address>
        <Tooltip title={additionalAddressesString}>
          <AdditionalAddress>{additionalAddressesString}</AdditionalAddress>
        </Tooltip>
      </div>
      <div>{mainAddress?.city}</div>
      <div>{HouseCategoryDictionary[housingStock.houseCategory]}</div>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
