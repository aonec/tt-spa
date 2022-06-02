import { Address } from '01/features/settings/inspectorsDistributionService/displayInspectorsHousingStocksService/inspectorHousingStockService/views/HousingStockItem/HousingStockItem.styled';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import React, { FC } from 'react';
import { Wrapper } from './ApartmentItem.styled';
import { ApartmentItemProps } from './ApartmentItem.types';

export const ApartmentItem: FC<ApartmentItemProps> = ({ apartment }) => {
  const housingStock = apartment?.housingStock;
  const mainAddress = housingStock?.address?.mainAddress;

  return (
    <Wrapper to={`/objects/${housingStock?.id}/apartments/${apartment.id}`}>
      <Address>
        {mainAddress?.street}, {mainAddress?.number}, кв.{' '}
        {apartment?.apartmentNumber}
      </Address>
      <div>{housingStock?.city}</div>
      <div>{housingStock?.houseType}</div>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
