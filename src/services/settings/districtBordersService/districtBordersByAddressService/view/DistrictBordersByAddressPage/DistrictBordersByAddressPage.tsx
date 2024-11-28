import React, { FC } from 'react';
import {
  AddressSortWrapper,
  ButtonSC,
  ButtonsWrapper,
  FooterWrapper,
  GoBackWrapper,
  LinkWrapper,
  Panel,
  TextWrapper,
  Wrapper,
} from './DistrictBordersByAddressPage.styled';
import { DistrictBordersByAddressPageProps } from './DistrictBordersByAddressPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Button } from 'ui-kit/Button';
import { AddressStreetGroup } from './AddressStreetGroup';
import { useNavigate } from 'react-router-dom';
import { addressesCountTexts } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.constants';
import { getCountText } from 'utils/getCountText';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const DistrictBordersByAddressPage: FC<
  DistrictBordersByAddressPageProps
> = ({
  selectCity,
  addresses,
  setFilter,
  checkedhousingStocksWithStreet,
  handleOpenDistrictEditer,
  isAllowedToEditer,
  filter,
  setHousingStocksWithStreet,
  openShowAddressesModal,
  checkedAddressesAmount,
  isLoading,
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GoBackWrapper>
        <GoBack />
      </GoBackWrapper>
      <WithLoader isLoading={isLoading}>
        <AddressSortWrapper>
          <AddressSearchContainer
            autoBurn
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
            ]}
            initialValues={{
              city: filter?.city,
              street: filter?.street,
              house: filter?.house,
              corpus: filter?.corpus,
            }}
            handleSubmit={(data) => {
              setFilter(data);

              if (data.city && filter?.city !== data.city) {
                selectCity(data.city);
              }
            }}
          />
        </AddressSortWrapper>

        {addresses?.map((address) => (
          <AddressStreetGroup
            address={address}
            key={address.street}
            checkedhousingStocksWithStreet={checkedhousingStocksWithStreet}
            setHousingStocksWithStreet={setHousingStocksWithStreet}
          />
        ))}

        <FooterWrapper>
          <Panel>
            <TextWrapper>
              Всего: {checkedAddressesAmount}{' '}
              {getCountText(checkedAddressesAmount, addressesCountTexts)}
              <LinkWrapper
                disabled={!checkedAddressesAmount}
                onClick={() =>
                  checkedAddressesAmount && openShowAddressesModal()
                }
              >
                Показать
              </LinkWrapper>
            </TextWrapper>
            <ButtonsWrapper>
              <Button type="ghost" onClick={() => navigate(-1)}>
                Отмена
              </Button>
              <ButtonSC
                disabled={!isAllowedToEditer}
                onClick={() => {
                  handleOpenDistrictEditer();
                  navigate('/districtBordersSettings/createByMap');
                }}
              >
                Продолжить
              </ButtonSC>
            </ButtonsWrapper>
          </Panel>
        </FooterWrapper>
      </WithLoader>
    </Wrapper>
  );
};
