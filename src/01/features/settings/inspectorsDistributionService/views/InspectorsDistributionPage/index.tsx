import React from 'react';
import { InspectorsHousingStocksListContainer } from '../../displayInspectorsHousingStocksService/InspectorsHousingStocksListContainer';
import {SearchInspectorsHousingStocksContainer} from "../../searchInspectorsHousingStocksService/SearchInspectorsHousingStocksContainer"
import { Wrap } from './components';

export const InspectorsDistributionPage = () => {
  return (
    <Wrap>
      <SearchInspectorsHousingStocksContainer />
      <InspectorsHousingStocksListContainer />
    </Wrap>
  );
};
