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

export const AddressHeader: FC<AddressHeaderProps> = ({ housingsByFilter }) => {
  const address = housingsByFilter.current?.address;

  return (
    <Wrapper>
      <CurrentHousingStock>
        {address?.city}, ул. {address?.street} {address?.houseNumber}
        {address?.houseCorpus}
      </CurrentHousingStock>
      <SwitcherWrapper>
        {housingsByFilter.previous?.address && (
          <HousingStocksSwitcher>
            <ChevronLeft />
            {getHousingStockAddressString(housingsByFilter.previous.address)}
          </HousingStocksSwitcher>
        )}
        {housingsByFilter.next?.address && (
          <HousingStocksSwitcher>
            {getHousingStockAddressString(housingsByFilter.next.address)}
            <ChevronRight />
          </HousingStocksSwitcher>
        )}
      </SwitcherWrapper>
    </Wrapper>
  );
};
