import React, { FC, useState } from 'react';
import {
  AddressSortWrapper,
  ButtonSC,
  FooterWrapper,
  GoBackWrapper,
  Panel,
  Wrapper,
} from './DistrictBordersByAddressPage.styled';
import { DistrictBordersByAddressPageProps } from './DistrictBordersByAddressPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Button } from 'ui-kit/Button';
import { AddressStreetGroup } from './AddressStreetGroup';

export const DistrictBordersByAddressPage: FC<
  DistrictBordersByAddressPageProps
> = ({
  handleFetchAddress,
  addresses,
  setFilter,
  checkedhousingStockIdsWithStreet,
  setHousingStockIds,
  handleOpenDistrictEditer,
  isAllowedToEditer,
}) => {
  const [prevCity, setPrevCity] = useState<string | undefined>(undefined);

  console.log(checkedhousingStockIdsWithStreet);
  return (
    <Wrapper>
      <GoBackWrapper>
        <GoBack />
      </GoBackWrapper>

      <AddressSortWrapper>
        <AddressSearchContainer
          fields={[
            SearchFieldType.City,
            SearchFieldType.Street,
            SearchFieldType.House,
            SearchFieldType.Corpus,
          ]}
          handleSubmit={(data) => {
            setFilter(data);

            if (data.city && prevCity !== data.city) {
              handleFetchAddress({
                City: data.city,
              });
              setPrevCity(data.city);
            }
          }}
        />
      </AddressSortWrapper>

      {addresses?.map((address) => (
        <AddressStreetGroup
          address={address}
          key={address.street}
          checkedhousingStockIdsWithStreet={checkedhousingStockIdsWithStreet}
          setHousingStockIds={setHousingStockIds}
        />
      ))}

      <FooterWrapper>
        <Panel>
          <Button type="ghost"> Отмена</Button>
          <ButtonSC
            disabled={!isAllowedToEditer}
            onClick={handleOpenDistrictEditer}
          >
            Продолжить
          </ButtonSC>
        </Panel>
      </FooterWrapper>
    </Wrapper>
  );
};
