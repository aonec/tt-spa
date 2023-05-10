import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { displayObjectsListService } from './displayObjectsListService.model';
import { ObjectsList } from './view/ObjectsList';
import { SearchObjects } from './view/SearchObjects';
import { HeaderInject } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

export const ObjectsListContainer: FC<HeaderInject> = ({ Header }) => {
  const pagedHousingStocks = useStore(
    displayObjectsListService.outputs.$housingStocks,
  );

  const housingStocks = pagedHousingStocks?.items;

  const isNotEmpty = (housingStocks?.length || 0) > 0;

  const handleSearch = useEvent(
    displayObjectsListService.inputs.searchHosuingStocks,
  );

  const isLoading = useStore(displayObjectsListService.outputs.$isLoading);

  const handlePageNumberChanged = useEvent(
    displayObjectsListService.inputs.setPageNumber,
  );

  const { HousingStocksGate } = displayObjectsListService.gates;

  return (
    <div>
      <HousingStocksGate />
      <Header>
        <SearchObjects handleSearch={handleSearch} />
      </Header>
      <ObjectsList isLoading={isLoading} housingStocks={housingStocks} />
      {isNotEmpty && !isLoading && (
        <Pagination
          showSizeChanger={false}
          defaultCurrent={1}
          current={pagedHousingStocks?.pageNumber}
          onChange={handlePageNumberChanged}
          total={pagedHousingStocks?.totalItems}
          pageSize={pagedHousingStocks?.pageSize}
        />
      )}
    </div>
  );
};
