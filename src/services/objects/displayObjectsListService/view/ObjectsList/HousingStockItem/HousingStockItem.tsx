import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import { WarningIcon } from 'ui-kit/icons';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import {
  AdditionalAddress,
  Address,
  NumberOfTasks,
  Wrapper,
} from './HousingStockItem.styled';
import { HousingStockItemProps } from './HousingStockItem.types';
import { HouseCategoryDictionary } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectMainInfoStage/createObjectMainInfoStage.constants';
import { EHouseCategory } from 'api/types';

export const HousingStockItem: FC<HousingStockItemProps> = ({
  housingStock,
}) => {
  const address = getBuildingAddress(housingStock);
  const mainAddress = housingStock.address?.mainAddress;

  const additionalAddressesString = useMemo(() => {
    const additionalAddresses = housingStock.address?.additionalAddresses || [];

    return additionalAddresses
      .map((elem) => {
        const corpusText = elem.corpus ? `, к.${elem.corpus}` : '';
        return `${elem.street}, ${elem.number}${corpusText}`;
      })
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

  const buildingProfilePath = useMemo(() => {
    if (housingStock.houseCategory === EHouseCategory.Living) {
      return 'livingProfile';
    }
    return 'nonResidentialProfile';
  }, [housingStock]);

  return (
    <Wrapper to={`/buildings/${buildingProfilePath}/${housingStock.id}`}>
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
