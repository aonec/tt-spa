import { HouseAddress } from 'api/types';
import React, { FC } from 'react';
import { Switcher } from 'ui-kit/shared_components/Switcher';
import { getHousingStockAddressString } from 'utils/getBuildingAddress';
import { CurrentHousingStock, Wrapper } from './AddressHeader.styled';
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
      <Switcher
        nextValue={nextAddress}
        previousValue={previuosAddress}
        textConstructor={(address) => getHousingStockAddressString(address)}
        handleClick={handleClickAddress}
      />
    </Wrapper>
  );
};
