import React, { useCallback, useEffect } from 'react';
import { Radio } from 'antd';
import { useState } from 'react';
import { SerialNumberSearch } from './SerialNumberSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { SearchInput, SearchWrapper, Wrapper } from './Filters.styled';
import { useHistory } from 'react-router-dom';
import { useFilters } from './Filter.hook';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { fromEnter } from '01/shared/ui/DatePickerNative';

const searchfields = [
  SearchFieldType.City,
  SearchFieldType.Street,
  SearchFieldType.House,
  SearchFieldType.Apartment,
];

export const FilterContainer = () => {
  const history = useHistory();

  const [searchContext, setSearchContext] = useState(1);
  const [question, setQuestion] = useState('');

  const isSerialNumberPage = searchContext === 2;

  const { syncSearchState, searchState } = useFilters();

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
  const serialNumberComponent = (
    <>
      <SerialNumberSearch setSearchContext={setSearchContext} />
    </>
  );

  const addressSearch = (
    <SearchWrapper>
      <AddressSearchContainer
        fields={searchfields}
        handleSubmit={syncSearchState}
      />
      <SearchInput
        placeholder="Л/с или ФИО"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onClick={() => setQuestion('')}
        onKeyDown={fromEnter(() => {
          console.log(question);
          syncSearchState({ question });
        })}
      />
    </SearchWrapper>
  );

  return (
    <Wrapper>
      <Radio.Group value={searchContext} onChange={onChangeRadio}>
        <Radio value={1}>Поиск по адресу</Radio>
        <Radio value={2}>Поиск по серийному номеру</Radio>
      </Radio.Group>
      <Space style={{ minHeight: 20 }} />
      {isSerialNumberPage ? serialNumberComponent : addressSearch}
    </Wrapper>
  );
};
