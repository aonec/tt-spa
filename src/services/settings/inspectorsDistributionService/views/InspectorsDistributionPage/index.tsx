import React from 'react';
import { InspectorsHousingStocksListContainer } from '../../displayInspectorsHousingStocksService/displayInspectorsHousingStocksService.container';
import { SearchInspectorsHousingStocksContainer } from '../../searchInspectorsHousingStocksService/searchInspectorsHousingStocks.container';
import { Wrap } from './components';

export const InspectorsDistributionPage = () => {
  return (
    <Wrap>
      <SearchInspectorsHousingStocksContainer />
      <InspectorsHousingStocksListContainer />
    </Wrap>
  );
};
