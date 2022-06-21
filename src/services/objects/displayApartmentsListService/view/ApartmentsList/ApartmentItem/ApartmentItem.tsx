import { Address } from '01/features/settings/inspectorsDistributionService/displayInspectorsHousingStocksService/inspectorHousingStockService/views/HousingStockItem/HousingStockItem.styled';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import React, { FC } from 'react';
import { Wrapper } from './ApartmentItem.styled';
import { ApartmentItemProps } from './ApartmentItem.types';

export const ApartmentItem: FC<ApartmentItemProps> = ({ apartment }) => {
  const address = apartment?.housingStock?.address?.mainAddress;

  return (
    <Wrapper to={`/objects/${address?.id}/apartments/${apartment.id}`}>
      <Address>
        {address?.street}, {address?.number}, кв.{' '}
        {apartment?.apartmentNumber}
      </Address>
      <div>{address?.city}</div>
      <div>{apartment?.housingStock?.houseType}</div>
      <ContextMenuButton size="small" />
    </Wrapper>
  );
};
