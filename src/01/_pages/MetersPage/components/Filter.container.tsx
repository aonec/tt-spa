import React, { useCallback, useEffect, useMemo } from 'react';
import { Radio } from 'antd';
import { useState } from 'react';
import { SerialNumberSearch } from './SerialNumberSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { SearchInput, SearchWrapper, Wrapper } from './Filters.styled';
import { useHistory, useParams } from 'react-router-dom';
import { useFilters } from './Filter.hook';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import {
  $apartment,
  fetchApartmentFx,
} from '01/features/apartments/displayApartment/models';
import { useStore } from 'effector-react';
import { TypeAddressToStart } from '01/shared/ui/TypeToStart';

const searchfields = [
  SearchFieldType.City,
  SearchFieldType.Street,
  SearchFieldType.House,
  SearchFieldType.Apartment,
];

export const FilterContainer = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [searchContext, setSearchContext] = useState(1);
  const [question, setQuestion] = useState('');

  const isSerialNumberPage = searchContext === 2;

  const { syncSearchState, searchState } = useFilters();

  const apartment = useStore($apartment);

  const pendingApartment = useStore(fetchApartmentFx.pending);

  useEffect(() => {
    if (!apartment?.homeownerAccounts?.length) {
      return setQuestion('');
    }

    const homeownerName = apartment?.homeownerAccounts[0]?.name;

    if (homeownerName && id) {
      setQuestion(homeownerName);
    }
  }, [apartment]);

  useEffect(() => {
    setQuestion(searchState.question || '');
  }, [searchState.question]);

  const onChangeRadio = useCallback(
    ({ target: { value } }) => {
      if (value === 2) history.push('/meters/apartments');

      if (value === 1) history.goBack();

      setSearchContext(value);
    },
    [history]
  );

  const initialSearchValues = useMemo(() => {
    if (!id) {
      return null;
    }
    const address = apartment?.housingStock?.address?.mainAddress;
    return {
      city: address?.city || '',
      street: address?.street || '',
      house: address?.number || '',
      apartment: apartment?.apartmentNumber || '',
    };
  }, [apartment]);

  const addressSearch = (
    <>
      <SearchWrapper>
        <AddressSearchContainer
          fields={searchfields}
          handleSubmit={syncSearchState}
          initialValues={initialSearchValues}
        />
        <SearchInput
          placeholder="Л/с или ФИО"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onClick={() => setQuestion('')}
          onKeyDown={fromEnter(() => {
            syncSearchState({ question });
          })}
        />
      </SearchWrapper>
      {(!apartment || !id) && !pendingApartment && <TypeAddressToStart />}
    </>
  );

  return (
    <Wrapper>
      <Radio.Group value={searchContext} onChange={onChangeRadio}>
        <Radio value={1}>Поиск по адресу</Radio>
        <Radio value={2}>Поиск по серийному номеру</Radio>
      </Radio.Group>
      <Space style={{ minHeight: 20 }} />
      {isSerialNumberPage && (
        <SerialNumberSearch setSearchContext={setSearchContext} />
      )}
      {!isSerialNumberPage && addressSearch}
    </Wrapper>
  );
};
