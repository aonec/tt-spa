import { HouseAddress } from 'myApi';
import React, { FC } from 'react';
import { getHousingStockAddressString } from 'utils/getHousingStockAddress';
import {
  ChevronLeft,
  ChevronRight,
  CurrentHousingStock,
  HousingStocksSwitcher,
  SwitcherWrapper,
  Wrapper,
} from './AddressHeader.styled';
import { AddressHeaderProps } from './AddressHeader.types';

export const AddressHeader: FC<AddressHeaderProps> = ({
  housingsByFilter,
  updateSearchPayload,
}) => {
  const address = housingsByFilter.current?.address;

  const previuosAddress = housingsByFilter?.previous?.address;
  const nextAddress = housingsByFilter?.next?.address;

  const handleClickAddress = (address: HouseAddress) => {
    updateSearchPayload({
      City: address.city || undefined,
      Street: address.street || undefined,
      HouseNumber: address.houseNumber || undefined,
      HouseCorpus: address.houseCorpus || undefined,
    });
  };

  return (
    <Wrapper>
      <CurrentHousingStock>
        {address?.city}, ул. {address?.street} {address?.houseNumber}
        {address?.houseCorpus}
      </CurrentHousingStock>
      <SwitcherWrapper>
        {previuosAddress && (
          <HousingStocksSwitcher
            onClick={() => handleClickAddress(previuosAddress)}
          >
            <ChevronLeft />
            {getHousingStockAddressString(previuosAddress)}
          </HousingStocksSwitcher>
        )}
        {nextAddress && (
          <HousingStocksSwitcher
            onClick={() => handleClickAddress(nextAddress)}
          >
            {getHousingStockAddressString(nextAddress)}
            <ChevronRight />
          </HousingStocksSwitcher>
        )}
      </SwitcherWrapper>
    </Wrapper>
  );
};
