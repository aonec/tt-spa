import React, { FC } from 'react';
import { useParams } from 'react-router';
import { SealActionType } from './sealService.types';
import { ApartmentSealContainer } from '../apartmentSealService';
import { SealActionSelectContainer } from '../sealActionSelectService';
import { DistributeRecordsContainer } from '../distributeRecordsService';
import { AppointmentsJournalContainer } from '../appointmentsJournal';

export const SealContainer = () => {
  const { section } = useParams<{ section: SealActionType }>();
  if (!section) return null;

  const componentsDictionary: { [key in SealActionType]: FC } = {
    [SealActionType.Select]: SealActionSelectContainer,
    [SealActionType.Apartment]: ApartmentSealContainer,
    [SealActionType.DistributeRecords]: DistributeRecordsContainer,
    [SealActionType.AppointmentsJournal]: AppointmentsJournalContainer,
  };

  const Component = componentsDictionary[section];

  if (!Component) return null;

  return <Component />;
};
