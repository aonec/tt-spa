import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayPersonalNumbersListService } from './displayPersonalNumbersListService.model';
import { PersonalNumbersList } from './view/PersonalNumbersList';
import { PersonalNumbersSearch } from './view/PersonalNumbersSearch';

const { inputs, outputs, gates } = displayPersonalNumbersListService;
const { SearchPersonalNumberGate } = gates;

export const DisplayPersonalNumbersListContainer = () => {
  const cities = useStore(outputs.$cities);
  const apartments = useStore(outputs.$apartments);
  const isLoading = useStore(outputs.$isLoading);

  const handleSearch = useEvent(inputs.searchPersonalNumbers);

  return (
    <>
      <SearchPersonalNumberGate />
      <ExistingCitiesGate />
      <PersonalNumbersSearch handleSearch={handleSearch} cities={cities} />
      <PersonalNumbersList apartments={apartments} isLoading={isLoading} />
    </>
  );
};
