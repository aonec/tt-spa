import React, { FC } from 'react';
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
import { GoBack } from 'ui-kit/shared/GoBack';
import { Button } from 'ui-kit/Button';
import { AddressStreetGroup } from './AddressStreetGroup';
import { useHistory } from 'react-router-dom';

export const DistrictBordersByAddressPage: FC<
  DistrictBordersByAddressPageProps
> = ({
  selectCity,
  addresses,
  setFilter,
  checkedhousingStockIdsWithStreet,
  handleOpenDistrictEditer,
  isAllowedToEditer,
  cityInFilter,
  setHousingStockIdsWithStreet,
}) => {
  const history = useHistory();

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
          initialValues={{ city: cityInFilter }}
          handleSubmit={(data) => {
            setFilter(data);

            if (data.city && cityInFilter !== data.city) {
              selectCity(data.city);
            }
          }}
        />
      </AddressSortWrapper>

      {addresses?.map((address) => (
        <AddressStreetGroup
          address={address}
          key={address.street}
          checkedhousingStockIdsWithStreet={checkedhousingStockIdsWithStreet}
          setHousingStockIdsWithStreet={setHousingStockIdsWithStreet}
        />
      ))}

      <FooterWrapper>
        <Panel>
          <Button type="ghost" onClick={history.goBack}>
            Отмена
          </Button>
          <ButtonSC
            disabled={!isAllowedToEditer}
            onClick={() => {
              handleOpenDistrictEditer();
              history.push('/districtBordersSettings/createByMap');
            }}
          >
            Продолжить
          </ButtonSC>
        </Panel>
      </FooterWrapper>
    </Wrapper>
  );
};
