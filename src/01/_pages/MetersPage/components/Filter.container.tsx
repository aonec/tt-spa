import React from 'react';
import { Radio } from 'antd';
import { useState } from 'react';
import { SerialNumberSearch } from './SerialNumberSearch';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { Wrapper } from './Filters.styled';
import { useHistory } from 'react-router-dom';
import { useFilters } from './Filter.hook';
import { Space } from '01/shared/ui/Layout/Space/Space';

const searchfields = [
  SearchFieldType.City,
  SearchFieldType.Street,
  SearchFieldType.House,
  SearchFieldType.Apartment,
];

export const Filter = () => {
  const history = useHistory();

  const [searchContext, setSearchContext] = useState(1);

  const isSerialNumberPage = searchContext === 2;
  

  const { syncSearchState } = useFilters();

  const serialNumberComponent = (
    <>
      <SerialNumberSearch setSearchContext={setSearchContext} />
    </>
  );

  return (
    <Wrapper>
      <Radio.Group
        value={searchContext}
        onChange={({ target: { value } }) => {
          if (value === 2) history.push('/meters/apartments');

          if (value === 1) history.goBack();

          setSearchContext(value);
        }}
      >
        <Radio value={1}>Поиск по адресу</Radio>
        <Radio value={2}>Поиск по серийному номеру</Radio>
      </Radio.Group>
      <Space style={{ minHeight: 20 }} />
      {isSerialNumberPage ? (
        serialNumberComponent
      ) : (
        <>
          <AddressSearchContainer
            fields={searchfields}
            handleSubmit={syncSearchState}
          />
        </>
      )}
    </Wrapper>
  );
};
