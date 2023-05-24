import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import {
  AddressSortWrapper,
  ButtonSC,
  Footerwrapper,
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

export const DistrictBordersByAddressPage: FC<
  DistrictBordersByAddressPageProps
> = ({ handleFetchAddress }) => {
  const [orderBy, setOrderBy] = useState<EOrderByRule | null>(null);

  return (
    <Wrapper>
      <GoBack />
      <AddressSortWrapper>
        <AddressSearchContainer
          fields={[
            SearchFieldType.City,
            SearchFieldType.Street,
            SearchFieldType.House,
            SearchFieldType.Corpus,
          ]}
          handleSubmit={(data) =>
            data.city &&
            handleFetchAddress({
              City: data.city,
              Street: data.street,
              OrderBy: orderBy || undefined,
            })
          }
        />
        <LabelWrapper>
          <div>Сортировать по:</div>
          <Select
            small
            placeholder="Выберите"
            value={orderBy || undefined}
            onChange={(value) => {
              // setOrderBy(value);
            }}
          >
            <Select.Option value={EOrderByRule.Descending}>
              Улице (уб.)
            </Select.Option>
            <Select.Option value={EOrderByRule.Ascending}>
              Улице (возр.)
            </Select.Option>
          </Select>
        </LabelWrapper>

        <Footerwrapper>
          <Panel>
            <Button type="ghost"> Отмена</Button>
            <ButtonSC>Продолжить</ButtonSC>
          </Panel>
        </Footerwrapper>
      </AddressSortWrapper>
    </Wrapper>
  );
};
