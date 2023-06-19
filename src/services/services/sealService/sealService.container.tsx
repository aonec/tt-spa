import React, { FC } from 'react';
import { useParams } from 'react-router';
import { SealActionType } from './sealService.types';
import { ApartmentSealContainer } from '../apartmentSealService';
import { SealActionSelectContainer } from '../sealActionSelectService';

export const SealContainer = () => {
  const { section } = useParams<{ section: SealActionType }>();

  const componentsDictionary: { [key in SealActionType]: FC } = {
    [SealActionType.Select]: SealActionSelectContainer,
    [SealActionType.Apartment]: ApartmentSealContainer,
  };

  const Component = componentsDictionary[section];

  return <Component />;
};
