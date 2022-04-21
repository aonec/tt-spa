import React from 'react';
import { InspectorsHousingStocksListContainer } from '../../displayInspectorsHousingStocksService/InspectorsHousingStocksListContainer';
import {SearchInspectorsHousingStocksContainer} from "../../searchInspectorsHousingStocksService/SearchInspectorsHousingStocksContainer"

export const InspectorsDistributionPage = () => {
  return (
    <>
      <SearchInspectorsHousingStocksContainer />
      <InspectorsHousingStocksListContainer />
    </>
  );
};
