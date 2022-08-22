import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { PaginationSC } from './displayPersonalNumberListSevice.styled';
import { displayPersonalNumbersListService } from './displayPersonalNumbersListService.model';
import { PersonalNumbersList } from './view/PersonalNumbersList';
import { PersonalNumbersSearch } from './view/PersonalNumbersSearch';

const { inputs, outputs, gates } = displayPersonalNumbersListService;
const { SearchPersonalNumberGate } = gates;

export const DisplayPersonalNumbersListContainer = () => {
  const cities = useStore(outputs.$cities);
  const apartments = useStore(outputs.$apartments);
  const isLoading = useStore(outputs.$isLoading);
  const apartmentsListPage = useStore(outputs.$apartmentsListPage);

  const handleSearch = useEvent(inputs.searchPersonalNumbers);
  const handlePageNumberChanged = useEvent(inputs.setPageNumber);

  const isNotEmpty = apartments.length > 0;

  return (
    <>
      <SearchPersonalNumberGate />
      <ExistingCitiesGate />
      <PersonalNumbersSearch handleSearch={handleSearch} cities={cities} />
      <PersonalNumbersList apartments={apartments} isLoading={isLoading} />
      {isNotEmpty && !isLoading && (
        <PaginationSC
          showSizeChanger={false}
          defaultCurrent={1}
          current={apartmentsListPage?.pageNumber}
          onChange={handlePageNumberChanged}
          total={apartmentsListPage?.totalItems}
          pageSize={apartmentsListPage?.pageSize}
        />
      )}
    </>
  );
};
