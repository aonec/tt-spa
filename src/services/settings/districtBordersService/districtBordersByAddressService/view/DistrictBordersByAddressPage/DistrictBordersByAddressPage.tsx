import React, { FC, useState } from 'react';
import {
  AddressSortWrapper,
  ButtonSC,
  FooterWrapper,
  GoBackWrapper,
  LabelWrapper,
  Panel,
  Wrapper,
} from './DistrictBordersByAddressPage.styled';
import { DistrictBordersByAddressPageProps } from './DistrictBordersByAddressPage.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Select } from 'ui-kit/Select';
import { EOrderByRule } from 'myApi';
import { Button } from 'ui-kit/Button';
import { AddressStreetGroup } from './AddressStreetGroup';

export const DistrictBordersByAddressPage: FC<
  DistrictBordersByAddressPageProps
> = ({ handleFetchAddress, addresses, setFilter }) => {
  const [orderBy, setOrderBy] = useState<EOrderByRule | null>(null);

  const [prevCity, setPrevCity] = useState<string | undefined>(undefined);

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
                // OrderBy: orderBy || undefined,
              });
              setPrevCity(data.city);
            }
          }}
        />
        {/* <LabelWrapper>
          <div>Сортировать по:</div>
          <Select
            small
            placeholder="Выберите"
            value={orderBy || undefined}
            onChange={(value) => {
              setOrderBy(value);
            }}
          >
            <Select.Option value={EOrderByRule.Descending}>
              Улице (уб.)
            </Select.Option>
            <Select.Option value={EOrderByRule.Ascending}>
              Улице (возр.)
            </Select.Option>
          </Select>
        </LabelWrapper> */}
      </AddressSortWrapper>

      {addresses?.map((address) => (
        <AddressStreetGroup address={address} key={address.street} />
      ))}

      <FooterWrapper>
        <Panel>
          <Button type="ghost"> Отмена</Button>
          <ButtonSC>Продолжить</ButtonSC>
        </Panel>
      </FooterWrapper>
    </Wrapper>
  );
};
