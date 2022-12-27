import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MeterSection } from './metersService.types';
import { HousingStockFilter } from '01/features/housingStocks/displayHousingStocks/components/HousingStockFilter/HousingStockFilter';
import HousesDevices from '01/_pages/MetersPage/components/HousesReadings/HousesDevices/HousesDevices';
import { AccountingNodesReadings } from '01/features/readings/accountingNodesReadings';
import { ApartmentReadingsContainer } from './ApartmentReadingsService';

export const MetersContainer: FC = () => {
  const { section } = useParams<{ section: MeterSection }>();

  const componentsDictionary: { [key in MeterSection]: FC } = {
    [MeterSection.Apartments]: ApartmentReadingsContainer,
    [MeterSection.Houses]: () => (
      <>
        <HousingStockFilter />
        <HousesDevices />
      </>
    ),
    [MeterSection.AccountingNodes]: AccountingNodesReadings,
  };

  const Component = componentsDictionary[section];

  return <Component />;
};
