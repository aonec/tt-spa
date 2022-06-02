import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { displayObjectsListService } from './displayObjectsListService.models';
import { ObjectsList } from './view/ObjectsList';
import { SearchObjects } from './view/SearchObjects';

export const ObjectsListContainer = () => {
  const pagedHousingStocks = useStore(
    displayObjectsListService.outputs.$housingStocks
  );

  const housingStocks = pagedHousingStocks?.items;

  const isNotEmpty = housingStocks?.length || 0 > 0;

  const handleSearch = useEvent(
    displayObjectsListService.inputs.searchHosuingStocks
  );

  const isLoading = useStore(displayObjectsListService.outputs.$isLoading);

  const handlePageNumberChanged = useEvent(
    displayObjectsListService.inputs.setPageNumber
  );

  const clearSearchState = useEvent(
    displayObjectsListService.inputs.clearSearchState
  );

  useEffect(() => () => clearSearchState(), []);

  return (
    <>
      <SearchObjects handleSearch={handleSearch} />
      <ObjectsList isLoading={isLoading} housingStocks={housingStocks} />
      {isNotEmpty && (
        <Pagination
          showSizeChanger={false}
          defaultCurrent={1}
          current={pagedHousingStocks?.pageNumber}
          onChange={(pageNumber) => handlePageNumberChanged(pageNumber)}
          total={pagedHousingStocks?.totalItems}
          pageSize={pagedHousingStocks?.pageSize}
        />
      )}
    </>
  );
};
