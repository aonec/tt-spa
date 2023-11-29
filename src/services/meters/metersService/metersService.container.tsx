import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MeterSection } from './metersService.types';
import { ApartmentReadingsContainer } from './ApartmentReadingsService';
import { HousesReadingsContainer } from './HousesReadingsService';
import { AccountingNodesReadingsContainer } from './AccountingNodesReadingsService';

export const MetersContainer: FC = () => {
  const { section } = useParams<{ section: MeterSection }>();
  if (!section) return null;

  const componentsDictionary: { [key in MeterSection]: FC } = {
    [MeterSection.Apartments]: ApartmentReadingsContainer,
    [MeterSection.Houses]: HousesReadingsContainer,
    [MeterSection.AccountingNodes]: AccountingNodesReadingsContainer,
  };

  const Component = componentsDictionary[section];

  return <Component />;
};
