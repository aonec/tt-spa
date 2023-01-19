import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MeterSection } from './metersService.types';
import { AccountingNodesReadings } from '01/features/readings/accountingNodesReadings';
import { ApartmentReadingsContainer } from './ApartmentReadingsService';
import { HousesReadingsContainer } from './HousesReadingsService';

export const MetersContainer: FC = () => {
  const { section } = useParams<{ section: MeterSection }>();

  const componentsDictionary: { [key in MeterSection]: FC } = {
    [MeterSection.Apartments]: ApartmentReadingsContainer,
    [MeterSection.Houses]: HousesReadingsContainer,
    [MeterSection.AccountingNodes]: AccountingNodesReadings,
  };

  const Component = componentsDictionary[section];

  return <Component />;
};
