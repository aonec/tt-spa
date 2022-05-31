import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayObjectsListService } from './displayObjectsListService.models';
import { ObjectsList } from './view/ObjectsList';
import { SearchObjects } from './view/SearchObjects';

export const ObjectsListContainer = () => {
  const pagedHousingStocks = useStore(
    displayObjectsListService.outputs.$housingStocks
  );

  const housingStocks = pagedHousingStocks?.items;

  const handleSearch = useEvent(
    displayObjectsListService.inputs.fetchHosuingStocks
  );

  const isLoading = useStore(displayObjectsListService.outputs.$isLoading);

  return (
    <>
      <SearchObjects handleSearch={handleSearch} />
      <ObjectsList isLoading={isLoading} housingStocks={housingStocks} />
    </>
  );
};
