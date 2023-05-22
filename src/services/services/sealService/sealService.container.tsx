import React, { FC } from 'react';
import { useParams } from 'react-router';
import { SealActionType } from './sealService.types';
import { SealActionSelectProfile } from './view/SealActionSelectProfile';
import { ApartmentSealContainer } from '../apartmentSealService';

export const SealContainer = () => {
  const { section } = useParams<{ section: SealActionType }>();

  const componentsDictionary: { [key in SealActionType]: FC } = {
    [SealActionType.Select]: SealActionSelectProfile,
    [SealActionType.Apartment]: ApartmentSealContainer,
  };

  const Component = componentsDictionary[section];

  return <Component />;
};
