import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { displayObjectsListService } from './displayObjectsListService.model';
import { ObjectsList } from './view/ObjectsList';
import { SearchObjects } from './view/SearchObjects';
import { HeaderInject } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';
import { SizeWrapper } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.styled';
import { getBuildingsQuery } from './displayObjectsListService.api';
import {
  PaginationSC,
  StickyPanel,
} from './view/ObjectsList/ObjectsList.styled';

const { HousingStocksGate } = displayObjectsListService.gates;

export const ObjectsListContainer: FC<HeaderInject> = ({ Header }) => {
  const {
    handlePageNumberChanged,
    handleSearch,
    isLoading,
    pagedHousingStocks,
    isBuildingFetched,
  } = useUnit({
    pagedHousingStocks: displayObjectsListService.outputs.$housingStocks,
    isLoading: displayObjectsListService.outputs.$isLoading,
    handlePageNumberChanged: displayObjectsListService.inputs.setPageNumber,
    handleSearch: displayObjectsListService.inputs.searchHosuingStocks,
    isBuildingFetched: getBuildingsQuery.$succeeded,
  });

  const housingStocks = pagedHousingStocks?.items;

  const isNotEmpty = (housingStocks?.length || 0) > 0;

  return (
    <div>
      <HousingStocksGate />
      <Header>
        <SearchObjects
          handleSearch={handleSearch}
          isSearchError={isBuildingFetched && !housingStocks?.length}
        />
      </Header>

      <SizeWrapper>
        <ObjectsList
          isLoading={isLoading}
          housingStocks={housingStocks}
          isBuildingFetched={isBuildingFetched}
        />
      </SizeWrapper>
      {isNotEmpty && !isLoading && (
        <StickyPanel>
          <PaginationSC
            showSizeChanger={false}
            defaultCurrent={1}
            current={pagedHousingStocks?.pageNumber}
            onChange={handlePageNumberChanged}
            total={pagedHousingStocks?.totalItems}
            pageSize={pagedHousingStocks?.pageSize}
          />
        </StickyPanel>
      )}
    </div>
  );
};
