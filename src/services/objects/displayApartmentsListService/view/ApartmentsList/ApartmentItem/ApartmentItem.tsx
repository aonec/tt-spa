import { Address } from 'services/settings/inspectorsDistributionService/displayInspectorsHousingStocksService/inspectorHousingStockService/views/HousingStockItem/HousingStockItem.styled';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import React, { FC } from 'react';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { Wrapper } from './ApartmentItem.styled';
import { ApartmentItemProps } from './ApartmentItem.types';
import { HouseCategoryDictionary } from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectMainInfoStage/createObjectMainInfoStage.constants';

export const ApartmentItem: FC<ApartmentItemProps> = ({ apartment }) => {
  const address = getApartmentAddressString(apartment);
  const mainAddress = apartment?.housingStock?.address?.mainAddress;

  return (
    <Wrapper to={`/apartments/${apartment.id}`}>
      <Address>{address}</Address>
      <div>{mainAddress?.city}</div>
      <div>
        {apartment?.housingStock?.houseCategory &&
          HouseCategoryDictionary[apartment?.housingStock?.houseCategory]}
      </div>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
